# Evolent.Sample
Contact management system will give you rights to manage your contact.
This app will provide you facility to Add New Contact, Edit, Delete and showing all contact details.
I develop this app by using web api, Repository pattern, Unit of Work.
I also created one Unit test project which i includes two test method. We can add new test method as per our requirement.
To run this app, Follow below steps
Download Evolent.Sample on your local machine.
Run "Contacts.sql" script from Database folder on SQL server. It will create you database for you application.
Open Evolent.Sample solution in visual studio 2013 or more. It might be not supported on below VS2013.
Set as "Evolent.Sample.UI" project as default project. Select "Evolent.Sample.UI" project then right click on project and click on properties. Go to Web and find Create Virtual directory button in it and click on it. It will deploy your application on local IIS.
Then your application will ready to go.
Check database connection in web.config file in "Evolent.Sample.UI" project. Please put your local database connection string in config.
After that your application ready to go...
