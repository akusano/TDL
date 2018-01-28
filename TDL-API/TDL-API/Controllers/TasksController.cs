using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TDL_API.Models;

namespace TDL_API.Controllers
{
    public class TasksController : ApiController
    {
        private DbModels db = new DbModels();

        // GET: api/Tasks
        [HttpGet]
        public IQueryable<Tasks> GetTasks()
        {
            return db.Tasks;
        }

        // GET: api/Tasks/5
        [HttpGet]
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult GetTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasks);
        }

        // PUT: api/Tasks/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTasks(int id, Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tasks.Id)
            {
                return BadRequest();
            }

            db.Entry(tasks).State = EntityState.Modified;

            try
            {
                if (tasks.Done)
                    tasks.ConclusionDate = DateTime.Now;
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tasks
        [HttpPost]
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult Post(Tasks tasks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            tasks.CreationDate = DateTime.Now;
            tasks.Done = false;
            db.Tasks.Add(tasks);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tasks.Id }, tasks);
        }

        // DELETE: api/Tasks/5
        [HttpDelete]
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult DeleteTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(tasks);
            db.SaveChanges();

            return Ok(tasks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TasksExists(int id)
        {
            return db.Tasks.Count(e => e.Id == id) > 0;
        }
    }
}