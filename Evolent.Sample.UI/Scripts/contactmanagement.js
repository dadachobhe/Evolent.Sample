

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
           onclickSubmit: function (response, postdata) {
               alert('hi');
           },
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
           afterShowForm: function ($form) {
               //$("#dData", $form.parent()).click();
               if (confirm('Are you sure you want to delete this contact?')) {
                   var myGrid = $('#list'),
                   selectedRowId = myGrid.jqGrid ('getGridParam', 'selrow'),
                   cellValue = myGrid.jqGrid('getCell', selectedRowId, 'Id');
                   $.ajax(
                       {
                           type: "DELETE", //HTTP POST Method    
                           url: "api/ContactManagement", // Controller/View     
                           data: { //Passing data    
                               id: cellValue
                           },
                           success: function (data) {
                               $("#alert-danger").html("<b>" + data + "</b>");
                               $("#alert-danger").show();
                               $("#alert-danger").delay(10000).fadeOut("slow");
                               GetContactData();
                               return [true, ''];
                           },
                           error: function (xhr, ajaxOptions, thrownError) {
                               $("#alert-danger").html("<b>" + thrownError + "</b>");
                               $("#alert-danger").show();
                               $("#alert-danger").delay(10000).fadeOut("slow");
                               GetContactData();
                               return [false, 'You can not submit!'];
                           }
                       });
               } else {
                   return [false, 'You can not submit!'];
               }
           },
           beforeSubmit: function (postdata, form, oper) {
               
           },
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
        $("#btnSubmit").click(function (e) {
            var form = document.querySelector('form');
            if (!form.checkValidity()) {
            } else {
                var emailData = $("#txtEmail").val();
                var phoneData = $("#txtMobileNo").val();
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                var phoneRegX = /^\d{10}$/;
                if (!filter.test(emailData)) {
                    e.preventDefault();
                    $("#lblerror").show();
                    $("#lblerror").text("Please enter valid email address.");
                    $("#txtEmail").focus();
                    return false;
                } else if (!phoneRegX.test(phoneData)) {
                    e.preventDefault();
                    $("#lblerror").show();
                    $("#lblerror").text("Please enter valid phone number.");
                    $("#txtMobileNo").focus();
                    return false;
                } else {
                    $("#lblerror").text("");
                    $("#lblerror").hide();
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
                            success: function(data) {
                                //alert(data);
                                $("#alert-danger").html("<b>" + data + "</b>");
                                $("#alert-danger").show();
                                $("#alert-danger").delay(10000).fadeOut("slow");
                            },
                            error: function(xhr, ajaxOptions, thrownError) {
                                //var r = data.responseText;  
                                //var errorMessage = r.Message;  
                                $("#alert-danger").html("<b>" + data + "</b>");
                                $("#alert-danger").show();
                                $("#alert-danger").delay(10000).fadeOut("slow");
                                GetContactData();
                            }
                        });
                }
            }
        });
       
    }
}
