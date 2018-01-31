using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Newtonsoft.Json;
using TDL_WPF.Model;

namespace TDL_WPF
{
    /// <summary>
    /// Interação lógica para MainWindow.xam
    /// </summary>
    public partial class MainWindow : Window
    {

        private HttpClient client;
        private System.Windows.Threading.DispatcherTimer dispatcherTimer;

        public MainWindow()
        {
            InitializeComponent();

            dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
            dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);
            dispatcherTimer.Interval = new TimeSpan(0, 0, 5);
            InitClient();
            GetTasks();
            
        }


        private void InitClient()
        {
            client = new HttpClient
            {
                BaseAddress = new Uri("https://tdl201801.azurewebsites.net")
            };
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


        }

        private async void GetTasks()
        {
            try
            {
                dispatcherTimer.Stop();
                tbStatus.Text = "Carregando tarefas....";

                HttpResponseMessage response = await client.GetAsync("/api/tasks");
                response.EnsureSuccessStatusCode();

                var strTsk = await response.Content.ReadAsStringAsync();
                List<MTask> tasks = JsonConvert.DeserializeObject<List<MTask>>(strTsk);
                lvTasks.ItemsSource = tasks;

                tbStatus.Text = "Done";
                
            }
            catch (Exception ex)
            {
                MessageBox.Show("Não foi possível recuperar as Tarefas");
                tbStatus.Text = ex.Message;
            }
            dispatcherTimer.Start();
        }

        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            GetTasks();
        }


        private void ButtonBase_OnClick(object sender, RoutedEventArgs e)
        {
            ToggleDone((MTask)((CheckBox)sender).DataContext);
        }

        private async void ToggleDone(MTask task)
        {
            dispatcherTimer.Stop();
            try
            {
                
                tbStatus.Text = "Atualizando situação das tarefas....";
                HttpContent conteudo = new StringContent(JsonConvert.SerializeObject(task), System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PutAsync("/api/tasks/" + task.Id.ToString(), conteudo);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível Atualizar a situação da Tarefa");
                tbStatus.Text = e.Message;

            }
            dispatcherTimer.Start();

        }

        private void TxtNewTask_OnKeyUp(object sender, KeyEventArgs e)
        {
            if (e.Key != System.Windows.Input.Key.Enter) return;
            e.Handled = true;
            AddNewTask(txtNewTask.Text);
            txtNewTask.Text = "";
        }

        private async void AddNewTask(String taskName)
        {
            dispatcherTimer.Stop();
            try
            {
                tbStatus.Text = "Adicionando nova tarefa....";
                MTask task = new MTask();
                task.Name = taskName;
                HttpContent conteudo = new StringContent(JsonConvert.SerializeObject(task), System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("/api/tasks", conteudo);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível adicionar uma nova Tarefa");
                tbStatus.Text = e.Message;
            }
            dispatcherTimer.Start();


        }

        private void BtDeleteTask_OnClick(object sender, RoutedEventArgs e)
        {
            MTask task = (MTask) ((Button) sender).DataContext;
            MessageBoxResult messageBoxResult = System.Windows.MessageBox.Show("A tarefa ["+ task.Name.ToUpper() +"] será excluida, Confirma?", "Confirmação de Exclusão", System.Windows.MessageBoxButton.YesNo);
            if (messageBoxResult == MessageBoxResult.Yes)
            {

                DeleteTask(task);
            }
        }

        private async void DeleteTask(MTask task)
        {
            dispatcherTimer.Stop();
            try
            {
                tbStatus.Text = "Excluindo tarefa....";
                HttpResponseMessage response = await client.DeleteAsync("/api/tasks/" + task.Id);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível excluir a Tarefa");
                tbStatus.Text = e.Message;
            }
            dispatcherTimer.Start();
        }
    }
}
