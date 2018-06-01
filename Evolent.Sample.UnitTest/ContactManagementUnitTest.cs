using System;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;
using Evolent.Sample.Core.Data;
using Evolent.Sample.UI.Controllers.Api;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Evolent.Sample.UnitTest
{
    [TestClass]
    public class ContactManagementUnitTest
    {
        [TestMethod]
        public void GetReturnsContact()
        {
            // Arrange
            var controller = new ContactManagementController
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };

            // Act
            var response = controller.Get(10);

            // Assert
            Contact contact;
            Assert.IsTrue(response.TryGetContentValue<Contact>(out contact));
            Assert.AreEqual(10, contact.Id);
        }

        [TestMethod]
        public void PostSetsLocationHeader()
        {
            // Arrange
            ContactManagementController controller = new ContactManagementController
            {
                Request = new HttpRequestMessage
                {
                    RequestUri = new Uri("http://localhost/Evolent.Sample.UI/api/ContactManagement")
                },
                Configuration = new HttpConfiguration()
            };

            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "ContactManagement" } });

            // Act
            Contact contact = new Contact() { FirstName = "Demo",LastName = "Test",Email = "demo@test.com",Status = true,PhoneNumber = "5241635241"};
            var response = controller.Post(contact);

            // Assert
            Assert.AreEqual("http://localhost/api/ContactManagement/10", response.Headers.Location.AbsoluteUri);
        }
    }
}
