var self = this;
var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var account = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var data = account.get(applicantData[0][0]);
        $("#index img.responsive-img").attr({"src":"img/profile/"+data[24]});
        var content = "<div class='content-block'>"+
                        "    <p class='color-gray'><h5>"+data[7]+" "+data[8]+"</h5></p>"+
                        // "    <p>"+
                        // "        <span><strong>Chief Technology Officer</strong> Pangasinan</span>"+
                        // "    </p>"+
                        "</div>"+
                        "<div class='content-block'>"+
                        "    <div class='row rows'>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='account'  class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>person</i></a><div class='grey-text' style = 'font-size: xx-small'>ACCOUNT</div>"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='career' class='career btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>briefcase_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>CAREER</div>"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='academic' class='academic btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>folder_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>ACADEMIC</div>"+
                        "        </div>"+
                        "    </div>"+
                        "    <div class='row rows'>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='bookmarks' class='bookmarks btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>bookmark_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>BOOKMARKS</div>"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='settings' class='settings btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>gear_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>SETTINGS</div>"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='resume' class='resume btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 0px;'>document_text_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>RESUME</div>"+
                        "      </div>"+
                        "    </div>"+
                        "</div>";
        $("#display_account").html(content);
        $$("a.account").on('click',function(){
            var data = $$(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            console.log(data);
            app.onPageInit('account',function(page){
                console.log('page');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.display(data);
                account.edit(data);
            });
        });
        $$("a.academic").on('click',function(){
            var data = $$(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            console.log(data);
            app.onPageInit('academic',function(page){
                console.log('page');
                academic.ini();
            }); 
        }); 
        $$("a.career").on('click',function(){
            var data = $$(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            console.log(data);
            app.onPageInit('career',function(page){
                console.log('page');
                career.ini();
            });
        });
    },
    display:function(data){
        $("img.resume").attr({"src":"img/profile/"+data[24]});
        var Ldata = language.getAll(data[0]);
        var L ="";
        $.each(Ldata,function(i,v){
            L +=""+v[2]+", ";
        });
        // console.log(L);
        var Skilldata = skills.getAll(data[0]);
        var skill ="";
        $.each(Skilldata,function(i,v){
            skill +=""+v[2]+", ";
        });
        // console.log(L);
        $$("#display_skills strong").html(skill);
        $$("#display_skills a").attr({"data-node":data[0]});
        $$("#display_language strong").html(L);
        $$("#display_language a").attr({"data-node":data[0]});
        $$("#display_givenName strong").html(data[7]);
        $$("#display_givenName a").attr({"data-value":data[7]});
        $$("#display_givenName a").attr({"data-node":data[0]});
        $$("#display_middleName strong").html(data[9]);
        $$("#display_middleName a").attr({"data-value":data[9]});
        $$("#display_middleName a").attr({"data-node":data[0]});
        $$("#display_lastName strong").html(data[8]);
        $$("#display_lastName a").attr({"data-value":data[8]});
        $$("#display_lastName a").attr({"data-node":data[0]});
        $$("#display_gender strong").html(data[10]);
        $$("#display_gender a").attr({"data-value":data[10]});
        $$("#display_gender a").attr({"data-node":data[0]});
        $$("#display_age strong").html(data[11]);
        $$("#display_age a").attr({"data-value":data[11]});
        $$("#display_age a").attr({"data-node":data[0]});
        $$("#display_dateOfBirth strong").html(data[12]);
        $$("#display_dateOfBirth a").attr({"data-value":data[12]});
        $$("#display_dateOfBirth a").attr({"data-node":data[0]});
        $$("#display_placeOfBirth strong").html(data[13]);
        $$("#display_placeOfBirth a").attr({"data-value":data[13]});
        $$("#display_placeOfBirth a").attr({"data-node":data[0]});
        $$("#display_address strong").html(data[14]);
        $$("#display_address a").attr({"data-value":data[14]});
        $$("#display_address a").attr({"data-node":data[0]});
        $$("#display_citizenship strong").html(data[15]);
        $$("#display_citizenship a").attr({"data-value":data[15]});
        $$("#display_citizenship a").attr({"data-node":data[0]});
        $$("#display_height strong").html(data[16]);
        $$("#display_height a").attr({"data-value":data[16]});
        $$("#display_height a").attr({"data-node":data[0]});
        $$("#display_weight strong").html(data[17]);
        $$("#display_weight a").attr({"data-value":data[17]});
        $$("#display_weight a").attr({"data-node":data[0]});
        $$("#display_mother strong").html(data[18]);
        $$("#display_mother a").attr({"data-value":data[18]});
        $$("#display_mother a").attr({"data-node":data[0]});
        $$("#display_father strong").html(data[19]);
        $$("#display_father a").attr({"data-value":data[19]});
        $$("#display_father a").attr({"data-node":data[0]});
        $$("#display_religion strong").html(data[21]);
        $$("#display_religion a").attr({"data-value":data[21]});
        $$("#display_religion a").attr({"data-node":data[0]});
        $$("#display_mother_occupation strong").html(data[22]);
        $$("#display_mother_occupation a").attr({"data-value":data[22]});
        $$("#display_mother_occupation a").attr({"data-node":data[0]});
        $$("#display_father_occupation strong").html(data[23]);
        $$("#display_father_occupation a").attr({"data-value":data[23]});
        $$("#display_father_occupation a").attr({"data-node":data[0]});

        $$('a.back').on('click', function(){
            view.router.back();
            account.ini();
        });
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-applicant',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    edit:function(data){
        $("a[data-cmd='edit']").on('click',function(){
            // app.popup('.popup-edit');
            var data = $(this).data();
            var id = data.node;
            if(data.prop == "GivenName"){
                $('#edit_givenName').removeClass('hidden');
                $('#display_givenName').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_givenName').addClass('hidden');
                    $('#display_givenName').removeClass('hidden');
                });             
                $("#form_givenName").validate({
                    rules: {
                        field_GivenName: {required: true,maxlength:30}
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
                        field_GivenName: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_givenName').addClass('hidden');
                                    $('#display_givenName').removeClass('hidden');
                                   
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "MiddleName"){
                $('#edit_middleName').removeClass('hidden');
                $('#display_middleName').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_middleName').addClass('hidden');
                    $('#display_middleName').removeClass('hidden');
                });             
                $("#form_middleName").validate({
                    rules: {
                        field_MiddleName: {required: true,maxlength:100}
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
                        field_MiddleName: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_middleName').addClass('hidden');
                                    $('#display_middleName').removeClass('hidden');
                                   
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "LastName"){
                $('#edit_lastName').removeClass('hidden');
                $('#display_lastName').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_lastName').addClass('hidden');
                    $('#display_lastName').removeClass('hidden');
                });                
                $("#form_lastName").validate({
                    rules: {
                        field_LastName: {required: true,maxlength:100}
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
                        field_LastName: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_lastName').addClass('hidden');
                                    $('#display_lastName').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Gender"){
                $('#edit_Gender').removeClass('hidden');
                $('#display_gender').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_Gender').addClass('hidden');
                    $('#display_gender').removeClass('hidden');
                });       
                $('select').material_select();
                $('div.select-wrapper').addClass('col s8');             
                $("#form_Gender").validate({
                    rules: {
                        field_Gender: {required: true,maxlength:100}
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
                        field_Gender: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        console.log(_form);
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_Gender').addClass('hidden');
                                    $('#display_gender').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Age"){
                $('#edit_age').removeClass('hidden');
                $('#display_age').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_age').addClass('hidden');
                    $('#display_age').removeClass('hidden');
                });            
                $("#form_age").validate({
                    rules: {
                        field_Age: {required: true,maxlength:100}
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
                        field_Age: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_age').addClass('hidden');
                                    $('#display_age').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "DateOfBirth"){
                $('#edit_dateOfBirth').removeClass('hidden');
                $('#display_dateOfBirth').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_dateOfBirth').addClass('hidden');
                    $('#display_dateOfBirth').removeClass('hidden');
                });           
                $("#form_dateOfBirth").validate({
                    rules: {
                        field_DateOfBirth: {required: true,maxlength:100}
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
                        field_DateOfBirth: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_dateOfBirth').addClass('hidden');
                                    $('#display_dateOfBirth').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "PlaceOfBirth"){  
                $('#edit_placeOfBirth').removeClass('hidden');
                $('#display_placeOfBirth').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_placeOfBirth').addClass('hidden');
                    $('#display_placeOfBirth').removeClass('hidden');
                });              
                $("#form_placeOfBirth").validate({
                    rules: {
                        field_PlaceOfBirth: {required: true,maxlength:100}
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
                        field_PlaceOfBirth: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_placeOfBirth').addClass('hidden');
                                    $('#display_placeOfBirth').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "PermanentAddress"){  
                $('#edit_address').removeClass('hidden');
                $('#display_address').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_address').addClass('hidden');
                    $('#display_address').removeClass('hidden');
                });             
                $("#form_PermanentAddress").validate({
                    rules: {
                        field_PermanentAddress: {required: true,maxlength:100}
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
                        field_PermanentAddress: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_address').addClass('hidden');
                                    $('#display_address').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Citizenship"){  
                $('#edit_citizenship').removeClass('hidden');
                $('#display_citizenship').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_citizenship').addClass('hidden');
                    $('#display_citizenship').removeClass('hidden');
                });              
                $("#form_Citizenship").validate({
                    rules: {
                        field_Citizenship: {required: true,maxlength:100}
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
                        field_Citizenship: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_citizenship').addClass('hidden');
                                    $('#display_citizenship').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Height"){  
                $('#edit_height').removeClass('hidden');
                $('#display_height').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_height').addClass('hidden');
                    $('#display_height').removeClass('hidden');
                });             
                $("#form_Height").validate({
                    rules: {
                        field_Height: {required: true,maxlength:100}
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
                        field_Height: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_height').addClass('hidden');
                                    $('#display_height').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Weight"){  
                $('#edit_weight').removeClass('hidden');
                $('#display_weight').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_weight').addClass('hidden');
                    $('#display_weight').removeClass('hidden');
                });               
                $("#form_Weight").validate({
                    rules: {
                        field_Weight: {required: true,maxlength:100}
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
                        field_Weight: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_weight').addClass('hidden');
                                    $('#display_weight').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "MotherName"){  
                $('#edit_mother').removeClass('hidden');
                $('#display_mother').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_mother').addClass('hidden');
                    $('#display_mother').removeClass('hidden');
                });              
                $("#form_Mother").validate({
                    rules: {
                        field_MotherName: {required: true,maxlength:100}
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
                        field_MotherName: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_mother').addClass('hidden');
                                    $('#display_mother').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "FatherName"){  
                $('#edit_father').removeClass('hidden');
                $('#display_father').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_father').addClass('hidden');
                    $('#display_father').removeClass('hidden');
                });             
                $("#form_father").validate({
                    rules: {
                        field_FatherName: {required: true,maxlength:100}
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
                        field_FatherName: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_father').addClass('hidden');
                                    $('#display_father').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Language"){
                $('#edit_language').removeClass('hidden');
                $('#display_language').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_language').addClass('hidden');
                    $('#display_language').removeClass('hidden');
                });            
                $('select').material_select();
                $('div.select-wrapper').addClass('col s8'); 
                $("#form_Language").validate({
                    rules: {
                        field_Language: {required: true,maxlength:100}

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
                        field_Language: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        console.log(_form);
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_language').addClass('hidden');
                                    $('#display_language').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Religion"){  
                $('#edit_religion').removeClass('hidden');
                $('#display_religion').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_religion').addClass('hidden');
                    $('#display_religion').removeClass('hidden');
                })             
                $("#form_religion").validate({
                    rules: {
                        field_Religion: {required: true,maxlength:100}
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
                        field_Religion: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_religion').addClass('hidden');
                                    $('#display_religion').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Mother_Occupation"){  
                $('#edit_mother_occupation').removeClass('hidden');
                $('#display_mother_occupation').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_mother_occupation').addClass('hidden');
                    $('#display_mother_occupation').removeClass('hidden');
                });            
                $("#form_mother_occupation").validate({
                    rules: {
                        field_Mother_Occupation: {required: true,maxlength:100}
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
                        field_Mother_Occupation: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_mother_occupation').addClass('hidden');
                                    $('#display_mother_occupation').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Father_Occupation"){  
                $('#edit_father_occupation').removeClass('hidden');
                $('#display_father_occupation').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_father_occupation').addClass('hidden');
                    $('#display_father_occupation').removeClass('hidden');
                });              
                $("#form_father_occupation").validate({
                    rules: {
                        field_Father_Occupation: {required: true,maxlength:100}
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
                        field_Father_Occupation: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_father_occupation').addClass('hidden');
                                    $('#display_father_occupation').removeClass('hidden');
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Skills"){ 
                $('#edit_skills').removeClass('hidden');
                $('#display_skills').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    var newdata = account.get(id);
                    account.display(newdata);
                    $('#edit_skills').addClass('hidden');
                    $('#display_skills').removeClass('hidden');
                });
                $('select').material_select();
                $('div.select-wrapper').addClass('col s8');
                $("#form_skills").validate({
                    rules: {
                        field_Skills: {required: true,maxlength:100}
                        
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
                        field_Skills: {
                            required: "<i data-error ='Field is required' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons tiny color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    var newdata = account.get(id);
                                    account.display(newdata);
                                    $('#edit_skills').addClass('hidden');
                                    $('#display_skills').removeClass('hidden');
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