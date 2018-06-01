

var ContactDetails = {

    GetContactData: function () {
        $("#list").jqGrid({
            url: 'api/ContactManagement',
            datatype: 'json',
            mtype: 'Get',
            colModel: [
                {
                    key: true, hidden: true, name: 'Id', index: 'Id', editable: false
                },

                {
                   key: false, name: 'FirstName', index: 'FirstName', width: 245, editable: true, editrules: { required: true },
                   editoptions: {
                        maxlength: "255"
                  }
               },
                {
                    name: 'LastName', index: 'LastName', width: 245, editable: true, editrules: { required: true },
                    editoptions: {
                        maxlength: "255"
                        }
                },
                {
                    name: 'Email', index: 'Email', width: 245, editable: true, editrules: { regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, required: true },
                    editoptions: {maxlength: "50"}
                    
                },

                {
                    name: 'PhoneNumber', index: 'PhoneNumber', width: 145, editable: true, editrules: { required: true },
                    editoptions: {
                        maxlength: "10", dataInit: function (element) {
                            $(element).keypress(function (e) {
                                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                                    alert("Accept only numeric value and only ten digits");
                                    return false;
                                }
                            });
                        }
                    }
                },
                {
                   name: 'Status', index: 'Status', width: 100, editable: true, editrules: { required: true }
                }
            ],
            pager: jQuery('#pager'),
            rowNum: 10,
            loadonce: true,
            rowList: [10, 20, 30, 40],
            height: '100%',
            viewrecords: true,
            caption: 'Contact Details',
            emptyrecords: 'No records to display',
            jsonReader: {
                repeatitems: false,
                root: function (obj) { return obj; },
                page: "page",
                total: "total",
                records: "records",
                ContactNo: "0"
            },
            autowidth: true,
            multiselect: false
        }).navGrid('#pager', { add: false, edit: true, del: true, search: false, refresh: true },
       {
           // edit options  
           zIndex: 1000,
           url: 'api/ContactManagement/Put',
           closeOnEscape: true,
           closeAfterEdit: true,
           recreateForm: true,
           loadonce: true,
           align: 'center',
           afterComplete: function (response) {
               GetContactData();
               if (response.responseText) {

                   alert(response.responseText);
               }
           }
       }, {},
       {
           // delete options  
           zIndex: 1000,
           url: 'api/ContactManagement/Delete',
           closeOnEscape: true,
           closeAfterdel: true,
           recreateForm: true,
           msg: "Are you sure you want to delete this contact?",
           afterComplete: function (response) {
               if (response.responseText) {
                   $("#alert-Grid").html("<b>" + response.responseText + "</b>");
                   $("#alert-Grid").show();
                   $("#alert-Grid").delay(3000).fadeOut("slow");
               }
           }
       });
    },
    insertContactDetails: function () {


        $("#btnSubmit").click(function () {

            $.ajax(
                {
                    type: "POST", //HTTP POST Method    
                    url: "api/ContactManagement", // Controller/View     
                    data: { //Passing data    

                        FirstName: $("#txtFName").val(), //Reading text box values using Jquery     
                        LastName: $("#txtLName").val(),
                        Email: $("#txtEmail").val(),
                        PhoneNumber: $("#txtMobileNo").val(),
                        Status: $("#status").val()
                    },
                    success: function (data) {
                        //alert(data);
                        $("#alert-danger").html("<b>" + data + "</b>");
                        $("#alert-danger").show();
                        $("#alert-danger").delay(10000).fadeOut("slow");
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        //var r = data.responseText;  
                        //var errorMessage = r.Message;  
                        $("#alert-danger").html("<b>" + data + "</b>");
                        $("#alert-danger").show();
                        $("#alert-danger").delay(10000).fadeOut("slow");
                        GetContactData();
                    }
                });
        });
       
    }
}