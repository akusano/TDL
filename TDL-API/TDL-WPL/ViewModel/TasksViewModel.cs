using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Windows;
using Newtonsoft.Json;
using TDL_WPF.Model;

namespace TDL_WPF.ViewModel
{
    public class TasksViewModel : MNotifyPropertyChange
    {
        private HttpClient client;

        public TasksViewModel()
        {
            InitClient();
            VMTasks = new ObservableCollection<MTask>();
            Refresh();
        }

        public ObservableCollection<MTask> VMTasks { get; }

        public string Status { get; private set; }

        public void Refresh()
        {
            GetTasks();
        }

        private void InitClient()
        {
            client = new HttpClient
            {
                BaseAddress = new Uri("https://tdl201801.azurewebsites.net")
            };
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        private async void GetTasks()
        {
            try
            {
                var response = await client.GetAsync("/api/tasks");
                response.EnsureSuccessStatusCode();

                var strTsk = await response.Content.ReadAsStringAsync();
                VMTasks.Clear();
                foreach (var task in JsonConvert.DeserializeObject<ObservableCollection<MTask>>(strTsk))
                    VMTasks.Add(task);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async void DeleteTask(object task)
        {
            try
            {
                //tbStatus.Text = "Excluindo tarefa....";
                var response = await client.DeleteAsync("/api/tasks/" + ((MTask) task).Id);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível excluir a Tarefa");
                //tbStatus.Text = e.Message;
            }
        }

        public async void AddNewTask(string taskName)
        {
            try
            {
                var task = new MTask();
                task.Name = taskName;
                HttpContent conteudo = new StringContent(JsonConvert.SerializeObject(task), Encoding.UTF8,
                    "application/json");
                var response = await client.PostAsync("/api/tasks", conteudo);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível adicionar uma nova Tarefa");
            }
        }

        public async void ToggleDone(object parameter)
        {
            try
            {
                var task = (MTask) parameter;
                task.Done = !task.Done;
                // tbStatus.Text = "Atualizando situação das tarefas....";
                HttpContent conteudo = new StringContent(JsonConvert.SerializeObject(task), Encoding.UTF8,
                    "application/json");
                var response = await client.PutAsync("/api/tasks/" + task.Id, conteudo);
                response.EnsureSuccessStatusCode();
                GetTasks();
            }
            catch (Exception e)
            {
                MessageBox.Show("Não foi possível Atualizar a situação da Tarefa");
                //tbStatus.Text = e.Message;
            }
        }
    }
}