using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Evolent.Sample.Core.Data;
using Evolent.Sample.Data;

namespace Evolent.Sample.UI.Controllers.Api
{
    public class ContactManagementController : ApiController
    {
         readonly Repository<Contact> _contactRepository;
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        public ContactManagementController()
        {
            _contactRepository = _unitOfWork.Repository<Contact>();
        }

        [HttpGet]
        public HttpResponseMessage Get()
        {
            IEnumerable<Contact> contactDetail;
            HttpResponseMessage response;
            try
            {
                contactDetail = _contactRepository.Get();
                response = Request.CreateResponse(HttpStatusCode.OK, contactDetail);
            }
            catch (ApplicationException ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new StringContent(ex.Message));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadGateway, new StringContent(ex.Message));
            }

            return response;
        }

        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
           Contact contactDetail;
            HttpResponseMessage response;
            try
            {
                contactDetail = _contactRepository.GetById(id);
                response = Request.CreateResponse(HttpStatusCode.OK, contactDetail);
            }
            catch (ApplicationException ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new StringContent(ex.Message));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadGateway, new StringContent(ex.Message));
            }

            return response;
        }


        [HttpPost]
        public HttpResponseMessage Post(Contact contact)
        {
            HttpResponseMessage response;
            try
            {
                contact.CreatedDate = DateTime.Now;
                contact.CreatedBy = "admin";
                _contactRepository.Insert(contact);
                response = Request.CreateResponse(HttpStatusCode.OK, new StringContent("Record inserted successfully"));
            }
            catch (ApplicationException ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new StringContent(ex.Message));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadGateway, new StringContent(ex.Message));
            }
            return response;
        }

        [HttpPut]
        public HttpResponseMessage Put(Contact contact)
        {
            HttpResponseMessage response;
            try
            {
                contact.UpdatedDate = DateTime.Now;
                _contactRepository.Update(contact);

                response = Request.CreateResponse(HttpStatusCode.OK, new StringContent("Record updated successfully"));
            }
            catch (ApplicationException ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new StringContent(ex.Message));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadGateway, new StringContent(ex.Message));
            }
            return response;
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            HttpResponseMessage response;
            try
            {
                Contact contact = _contactRepository.GetById(id);
                _contactRepository.Delete(contact);
                response = Request.CreateResponse(HttpStatusCode.OK, new StringContent("Record deleted successfully"));
            }
            catch (ApplicationException ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, new StringContent(ex.Message));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadGateway, new StringContent(ex.Message));
            }

            return response;
        }  
    }
}
