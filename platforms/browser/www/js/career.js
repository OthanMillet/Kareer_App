var self = this;
var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var career = {
  ini:function(){
      var applicantData = JSON.parse(localStorage.getItem('applicant'));
      var list = career.getAll(applicantData[0][0]);
      $$("a[data-cmd='add-career']").on('click',function(){
          career.add(applicantData[0][0]);
          $('div.display').addClass('hidden');
          $('div.add').removeClass('hidden');
          $('.card-header').addClass('hidden');
          $('div.NAV ').addClass('hidden');
          $('div.TOOL').addClass('hidden');
      });
      career.show(list);
  },
  add:function(id){
      $("a.goback").on('click',function(){
          $("div.list").removeClass('hidden');
          $("div.add").addClass('hidden');
          $("a.add").removeClass('hidden');
          $("a.goback").addClass('hidden');
          $("a.home").removeClass('hidden');
          var data = $(this).data('load');
          view.router.loadPage("pages/admin/"+data+".html");
      });
      $$("i[data-cmd='close']").on('click',function(){
          career.ini()
          $('div.display').removeClass('hidden');
          $('div.add').addClass('hidden');
          $('.card-header').removeClass('hidden');
          $('div.NAV ').removeClass('hidden');
          $('div.TOOL').removeClass('hidden');
      });
      $('select').material_select();
      $("#form_career").validate({
          rules: {
              field_dateFirst: {required: true, maxlength:20},
              field_dateLast: {required: true, maxlength:20},
              field_dateLast: { greaterThan: "#field_dateFirst" },
              field_position: {required: true, maxlength:100},
              field_agency: {required: true, maxlength:100},
              field_salary: {required: true, maxlength:5},
              field_appointment: {required: true, maxlength:100},
              field_govt_service: {required: true, maxlength:100},
          },
          errorElement : 'div',
          errorPlacement: function(error, element) {
              var placement = $(element).data('error');
              if(placement){
                  $(placement).append(error)
              } 
              else{
                  error.insertAfter(element);
              }
          },
          submitHandler: function (form) {
              var _form = $(form).serializeArray();
              var data = system.ajax(processor+'do-career',[id,_form]);
              data.done(function(data){
                  console.log(data);
                  if(data != 0){
                      $$("input").val("");
                      system.notification("Kareer","Career Added.",false,2000,true,false,function(){
                          career.ini();
                          $('div.display').removeClass('hidden');
                          $('div.add').addClass('hidden');
                          $('.card-header').removeClass('hidden');
                          $('div.NAV ').removeClass('hidden');
                          $('div.TOOL').removeClass('hidden');
                      });
                  }
                  else{
                      system.notification("Kareer","Failed.",false,3000,true,false,false);
                  }
              })
          }
      });
  },
  getAll:function(id){
      var $data = "";
      var jobs = system.ajax(processor+'get-careerAll',id);
      jobs.done(function(data){
          $data = data;
      });
      return JSON.parse($data);
  },
  get:function(id){
      var $data = "";
      var jobs = system.ajax(processor+'get-career',id);
      jobs.done(function(data){
          $data = data;
      });
      return JSON.parse($data);
  },
  show:function(list){
      var content = "";       
      $.each(list,function(i,v){
          content += "<li class='collection-item row'>"+
                      "   <div class='chip' style = 'width: 10%;'>"+
                      "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[4][0]+"</div>"+
                      "   </div>"+
                      "   <div class = 'col 33'>"+
                      "   <div class='title color-teal' ><strong class ='color-black'>"+v[4]+"</strong></div>"+
                      "   <div class ='color-teal' ><small class ='color-black'>"+v[2]+" - "+v[3]+"</small></div>"+
                      "   </div>"+
                      "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                      "</li>";
          $("a.career").removeClass('disabled');
          $("div.empty").addClass('hidden');

      });

      $$("#display_career").html("<ul class='collection'>"+content+"</ul");

      $$("a[data-cmd='view']").on('click',function(){
          var data = $(this).data();
          var id = data.node;
          var c = career.get(id);
          career.display(c);
          career.edit(c);
          $('div.display').addClass('hidden');
          $('div.focus').removeClass('hidden');
          $('.card-header a').addClass('hidden');
          $('div.NAV ').addClass('hidden');
          $('div.TOOL').addClass('hidden');
      });
      $$('a.back').on('click', function(){
          view.router.back();
          career.ini();
      });
      $("a.career").on('click',function(){
          var data = $(this).data('load');
          view.router.loadPage("pages/admin/"+data+".html");
          app.onPageInit('builderAcademic',function(page){
              academic.ini();
          });
      });
  },
  display:function(c){
      $$("#display_fromdate strong").html(c[0][2]);
      $$("#display_fromdate a").attr({"data-node":c[0][0]});
      $$("#display_todate strong").html(c[0][3]);
      $$("#display_todate a").attr({"data-node":c[0][0]});
      $$("#display_position strong").html(c[0][4]);
      $$("#display_position a").attr({"data-node":c[0][0]});
      $$("#display_agency strong").html(c[0][5]);
      $$("#display_agency a").attr({"data-node":c[0][0]});
      $$("#display_salary strong").html(c[0][6]);
      $$("#display_salary a").attr({"data-node":c[0][0]});
      $$("#display_appointment strong").html(c[0][7]);
      $$("#display_appointment a").attr({"data-node":c[0][0]});
      $$("#display_govt_service strong").html(c[0][8]);
      $$("#display_govt_service a").attr({"data-node":c[0][0]});
      
      $("a.home").on('click',function(){
          var data = $(this).data('load');
          view.router.loadPage("pages/admin/"+data+".html");
      });
      app.onPageInit('career',function(page){
          career.ini();
      });
      $$("a[data-cmd='back']").on('click',function(){
          career.ini();
          $('div.display').removeClass('hidden');
          $('div.focus').addClass('hidden');
          $('.card-header a').removeClass('hidden');
          $('div.NAV').removeClass('hidden');
          $('div.TOOL').removeClass('hidden');
      });
      $$("a[data-cmd='delete']").on('click',function(){
          career.delete(c);
          $('div.display').addClass('hidden');
          $('div.focus').addClass('hidden');
          $('div.delete').removeClass('hidden');
          $('.card-header').addClass('hidden');
          $('div.NAV ').addClass('hidden');
          $('div.TOOL').addClass('hidden');
      });
  },
  delete:function(c){
      var id = c[0][0];
      $$("a[data-cmd='cancel']").on('click',function(){
          career.display(c);
          $('div.display').addClass('hidden');
          $('div.focus').removeClass('hidden');
          $('div.delete').addClass('hidden');
          $('.card-header').removeClass('hidden');
          $('div.NAV').removeClass('hidden');
          $('div.TOOL').removeClass('hidden');
      });
      $$("a[data-cmd='proceed']").on('click',function(){
          var acad = system.ajax(processor+'do-deleteCareer',id);
          acad.done(function(data){
              if(data != 0){
                  system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                      career.ini();
                      $('div.display').removeClass('hidden');
                      $('div.focus').addClass('hidden');
                      $('div.delete').addClass('hidden');
                      $('.card-header').removeClass('hidden');
                      $('.card-header a').removeClass('hidden');
                      $('div.NAV').removeClass('hidden');
                      $('div.TOOL').removeClass('hidden');
                  });

              }
              else{
                  system.notification("Kareer","Failed.",false,3000,true,false,false);
              }
          });
      });
  },
  edit:function(c){
      $$("a[data-cmd='update']").on('click',function(){
          var data = $(this).data();
          var id = data.node;
          if(data.prop == "Dates"){
              $('#edit_dates').removeClass('hidden');
              $('#dates').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_dates').addClass('hidden');
                  $('#dates').removeClass('hidden');
              });
              $("#form_dates").validate({
                  rules: {
                      field_date1: {required: true, maxlength:20},
                      field_date2: {required: true, maxlength:20, greaterThan: "#field_date1"},
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  messages: {
                      field_date1: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                      field_date2: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          greaterThan: "<i data-error ='TO date must be greater than FROM date.' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          // console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_dates').addClass('hidden');
                                  $('#dates').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
          else if(data.prop == "Position"){
              $('#edit_position').removeClass('hidden');
              $('#position').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_position').addClass('hidden');
                  $('#position').removeClass('hidden');
              });
              $("#form_position").validate({
                  rules: {
                      field_position: {required: true, maxlength:100},
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  messages: {
                      field_position: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_position').addClass('hidden');
                                  $('#position').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
          else if(data.prop == "Agency"){
              $('#edit_agency').removeClass('hidden');
              $('#agency').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_agency').addClass('hidden');
                  $('#agency').removeClass('hidden');
              });
              $("#form_agency").validate({
                  rules: {
                      field_agency: {required: true, maxlength:100},
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  messages: {
                      field_agency: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_agency').addClass('hidden');
                                  $('#agency').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
          else if(data.prop == "Salary"){
              $('#edit_salary').removeClass('hidden');
              $('#salary').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_salary').addClass('hidden');
                  $('#salary').removeClass('hidden');
              });
              $("#form_salary").validate({
                  rules: {
                      field_salary: {required: true, maxlength:5, min:1, max:50000}
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  messages: {
                      field_salary: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          min: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          max: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_salary').addClass('hidden');
                                  $('#salary').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
          else if(data.prop == "Appointment"){
              $('#edit_appointment').removeClass('hidden');
              $('#appointment').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_appointment').addClass('hidden');
                  $('#appointment').removeClass('hidden');
              });
              $("#form_edit").validate({
                  rules: {
                      field_appointment: {required: true, maxlength:100}
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  messages: {
                      field_salary: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      },
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_appointment').addClass('hidden');
                                  $('#appointment').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
          else if(data.prop == "Gov"){
              $('#edit_gov').removeClass('hidden');
              $('#gov').addClass('hidden');
              $("a[data-cmd='cancel']").on('click', function(){
                  var newdata = career.get(id);
                  career.display(newdata);
                  $('#edit_gov').addClass('hidden');
                  $('#gov').removeClass('hidden');
              });
              $('select').material_select();
              $('div.select-wrapper').addClass('col s8'); 
              $("#form_gov").validate({
                  rules: {
                      field_govt_service: {required: true, maxlength:3},
                  },
                  errorElement : 'div',
                  errorPlacement: function(error, element) {
                      var placement = $(element).data('error');
                      if(placement){
                          $(placement).append(error)
                      } 
                      else{
                          error.insertAfter(element);
                      }
                  },
                  submitHandler: function (form) {
                      var _form = $(form).serializeArray();
                      var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                      data.done(function(data){
                          console.log(data);
                          if(data != 0){
                              system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                  var newdata = career.get(id);
                                  career.display(newdata);
                                  $('#edit_gov').addClass('hidden');
                                  $('#gov').removeClass('hidden');
                              });

                          }
                          else{
                              system.notification("Update","Failed.",false,3000,true,false,false);
                          }
                      })
                  }
              });
          }
      });
  }
}