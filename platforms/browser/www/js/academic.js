var self = this;
var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var academic = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var list = academic.getAll(applicantData[0][0]);
        $$("a[data-cmd='add-academic']").on('click',function(){
            academic.add(applicantData[0][0]);
            $('div.display').addClass('hidden');
            $('div.add').removeClass('hidden');
            $('.card-header').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
        academic.show(list);
    },
    add:function(id){
        $$("i[data-cmd='close']").on('click',function(){
            academic.ini()
            $('div.display').removeClass('hidden');
            $('div.add').addClass('hidden');
            $('.card-header').removeClass('hidden');
            $('div.NAV ').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $('select').material_select();

        $("#field_YearLevel").on('change', function() {
            var value = $(this).val();

            if ((value == 'Elementary') || (value == 'High School')){
                $('#degree div').addClass('hidden');
                $('#units div').addClass('hidden');
                            console.log(value);
            }
            else if ((value == 'Tech Voc') || (value == 'College') || (value == 'Masteral') || (value == 'Doctorate')){
                $('#degree div').removeClass('hidden');
                $('#units div').removeClass('hidden');
                            console.log(value);
            }
        });

        $("#form_academic").validate({
            rules: {
                field_YearLevel: {required: true,maxlength:20},
                field_School: {required: true,maxlength:100},
                field_Degree: {required: true,maxlength:100},
                field_Units: {required: true,maxlength:3,},
                field_DateFrom: {required: true, maxlength:20},
                field_DateTo: {required: true, maxlength:20, greaterThan: "#field_DateFrom"},
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
                  field_DateFrom: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
                  field_DateTo: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      greaterThan: "<i data-error ='' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
                  field_YearLevel: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
                  field_School: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
                  field_Degree: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
                  field_Units: {
                      required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                      maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                  },
            },
            submitHandler: function (form) {
                var _form = $(form).serializeArray();
                var data = system.ajax(processor+'do-academic',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$("input").val("");
                        system.notification("Kareer","Academic Added.",false,2000,true,false,function(){
                            academic.ini()
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
        var jobs = system.ajax(processor+'get-academicAll',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-academic',id);
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
                        "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                        "   </div>"+
                        "   <div class = 'col 33'>"+
                        "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                        "   <div class ='color-teal' ><small class ='color-black'>"+v[5]+"</small></div>"+
                        "   </div>"+
                        "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                        "</li>";

                $("a.academic").removeClass('disabled');
        });
        $$("#display_academic").html("<ul class='collection'>"+content+"</ul");
        $("a[data-cmd='view']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            var a = academic.get(id);
            academic.display(a);
            academic.edit(a);
            $('div.display').addClass('hidden');
            $('div.focus').removeClass('hidden');
            $('.card-header a').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });

        $$('a.back').on('click', function(){
            view.router.back();
            academic.ini();
        });

        $("a.academic").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            app.onPageInit('builderSkills',function(page){
                skills.ini();
            });
        });
    },
    display:function(a){
        var period = a[0][5];
        if((a[0][2] == 'Elementary') || (a[0][2] == 'High School')){
            $('div.degree').addClass('hidden');
            $('div.units').addClass('hidden');
        }
        else if ((a[0][2] == 'Tech Voc') || (a[0][2] == 'College') || (a[0][2] == 'Masteral') || (a[0][2] == 'Doctorate')){
            $('div.degree').removeClass('hidden');
            $('div.units').removeClass('hidden');
        }
        $$("#display_Year_level strong").html(a[0][2]);
        $$("#display_Year_level a").attr({"data-node":a[0][0]});
        $$("#display_school strong").html(a[0][3]);
        $$("#display_school a").attr({"data-node":a[0][0]});
        $$("#display_degree strong").html(a[0][4]);
        $$("#display_degree a").attr({"data-node":a[0][0]});
        $$("#display_units strong").html(a[0][6]);
        $$("#display_units a").attr({"data-node":a[0][0]});
        $$("#display_fromdate strong").html(period.substr(0,8));
        $$("#display_fromdate a").attr({"data-node":a[0][0]});
        $$("#display_todate strong").html(period.substr(9));
        $$("#display_todate a").attr({"data-node":a[0][0]});

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });
        app.onPageInit('academic',function(page){
            academic.ini();
        });
        $$("a[data-cmd='back']").on('click',function(){
            academic.ini();
            $('div.display').removeClass('hidden');
            $('div.focus').addClass('hidden');
            $('.card-header a').removeClass('hidden');
            $('div.NAV').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $$("a[data-cmd='delete']").on('click',function(){
            academic.delete(a);
            $('div.display').addClass('hidden');
            $('div.focus').addClass('hidden');
            $('div.delete').removeClass('hidden');
            $('.card-header').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
    },
    delete:function(a){
      var id = a[0][0];
      $$("a[data-cmd='cancel']").on('click',function(){
          academic.display(a);
          $('div.display').addClass('hidden');
          $('div.focus').removeClass('hidden');
          $('div.delete').addClass('hidden');
          $('.card-header').removeClass('hidden');
          $('div.NAV').removeClass('hidden');
          $('div.TOOL').removeClass('hidden');
      });
      $$("a[data-cmd='proceed']").on('click',function(){
          var acad = system.ajax(processor+'do-deleteAcad',id);
          acad.done(function(data){
              if(data != 0){
                  system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                      academic.ini();
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
    edit:function(a){
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            if(data.prop == "Year"){
                $('#edit_year').removeClass('hidden');
                $('#year').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = academic.get(id);
                    academic.display(newdata);
                    $('#edit_year').addClass('hidden');
                    $('#year').removeClass('hidden');
                });
                $('select').material_select();
                $('div.select-wrapper').addClass('col s8'); 
                $("#form_year").validate({
                    rules: {
                        field_yearLevel: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = academic.get(id);
                                    academic.display(newdata);
                                    $('#edit_year').addClass('hidden');
                                    $('#year').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "School"){
                $('#edit_school').removeClass('hidden');
                $('#school').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = academic.get(id);
                    academic.display(newdata);
                    $('#edit_school').addClass('hidden');
                    $('#school').removeClass('hidden');
                });
                $("#form_school").validate({
                    rules: {
                        field_school: {required: true,maxlength:100}
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
                        field_school: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = academic.get(id);
                                    academic.display(newdata);
                                    $('#edit_school').addClass('hidden');
                                    $('#school').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Degree"){
                $('#edit_educcation').removeClass('hidden');
                $('#educcation').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = academic.get(id);
                    academic.display(newdata);
                    $('#edit_educcation').addClass('hidden');
                    $('#educcation').removeClass('hidden');
                });
                $("#form_educcation").validate({
                    rules: {
                        field_degree: {required: true, maxlength:100},
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
                        field_degree: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = academic.get(id);
                                    academic.display(newdata);
                                    $('#edit_educcation').addClass('hidden');
                                    $('#educcation').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Units"){
                $('#edit_units').removeClass('hidden');
                $('#units').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = academic.get(id);
                    academic.display(newdata);
                    $('#edit_units').addClass('hidden');
                    $('#units').removeClass('hidden');
                });
                $("#form_units").validate({
                    rules: {
                        field_units: {required: true,maxlength:3},
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
                        field_units: {
                          required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                          maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = academic.get(id);
                                    academic.display(newdata);
                                    $('#edit_units').addClass('hidden');
                                    $('#units').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Dates"){
                $('#edit_attendance').removeClass('hidden');
                $('#attendance').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = academic.get(id);
                    academic.display(newdata);
                    $('#edit_attendance').addClass('hidden');
                    $('#attendance').removeClass('hidden');
                });
                $("#form_attendance").validate({
                    rules: {
                        field_dateF: {required: true, maxlength:20},
                        field_dateT: {required: true, maxlength:20, greaterThan: "#field_dateF"},
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
                        field_dateF: {
                              required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                              maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                         },
                        field_dateT: {
                              required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                              maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                              greaterThan: "<i data-error ='TO date must be greater than FROM date.' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = academic.get(id);
                                    academic.display(newdata);
                                    $('#edit_attendance').addClass('hidden');
                                    $('#attendance').removeClass('hidden');
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