// var processor = 'http://localhost/KAPP/www/harmony/mobile.php?';
var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var system = function(){
    "use strict";

    return {
        ini:function(){
            // var deviceSize = system.getDeviceSize();
            // console.log(deviceSize);
            logIn.ini();
            signUp.ini();
            // content.ini();
        },
        notification:function(title,message,button,timeout,loader,_functionOpen,_functionClose){
            var timeout = (timeout == "")?false:timeout;
            app.addNotification({
                title: title,
                message: message,
                button:button,
                onClose:function(){
                    if(_functionClose != false){
                        _functionClose();
                    }
                }
            });
            if(timeout != false){
                setTimeout(function(){
                    app.closeNotification(".notification-item");
                },timeout);
            }
            if(_functionOpen != false){
                _functionOpen();                
            }
        },
        ajax:function(url,data){
            return $.ajax({
                type: "POST",
                url: url,
                data: {data: data},
                async: !1,
                cache:false,
                error: function() {
                    console.log("Error occured")
                }
            });        
        },
        html:function(url){
            return $.ajax({
                type: "GET",
                url: url,
                crossDomain: true,
                dataType:'jsonp',
                jsonp:true,
                headers: 'X-Requested-With: XMLHttpRequest',
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                error: function() {
                    console.log("Error occured")
                }
            });
        },
        xml:function(url){
            return $.ajax({
                type: "GET",
                url: url,
                dataType: 'xml',
                async: !1,
                cache:false
            });
        },
        popover:function(title,message){
            var mainView = app.addView('.view-main');            
            app.addNotification({
                title: title,
                message: message
            });
        },
        preloader:function(status){
            if(status){
                var container = $$('body');
                if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
                app.showProgressbar(container, 'multi');
            }
            else{
                app.hideProgressbar();              
            }
        },
        block:function(status){
            if(status){
                app.popup('.loader');
            }
            else{
                app.closeModal('.loader');
            }
        },
        logoHandler:function(){
            var bg = 'img/img-bg.jpg';
            var logo = 'img/logo.png';
            bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
            logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

            $("img[src='img/logo.png']").attr({'src':logo});
            $(".panel .panel-bg").attr({'style':'background-image:url('+bg+');'});
        },      
        getDeviceSize:function(){
            var device = window;
            return window.innerWidth;
        }
    }
}();
var content = {
	ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        if((applicantData == null) || (applicantData == "")){
            view.router.loadPage("index.html");
        }
        else{
            view.router.loadPage("pages/admin/index.html");
            // view.router.loadPage("index.html");
            $$(".navbar").removeClass('hidden');
            
            app.onPageInit('index',function(page){
                content.controller();
                account.ini();
            });         

            app.onPageInit('job',function(page){
                content.controller();
                var applicant = JSON.parse(localStorage.getItem('applicant'));
                var jobList = jobs.get(applicant[0][0]);
                var appliedList = jobs.applied(applicant[0][0]);
                var bookmarkedList = jobs.bookmarked(applicant[0][0]);
                jobs.show(jobList);
            });

            app.onPageInit('search',function(page){
                content.controller();
                var salarySlider = document.getElementById('salary-slider');
                noUiSlider.create(salarySlider, {
                    start: [0, 20000],
                    connect: true,
                    step: 1000,
                    orientation: 'horizontal', // 'horizontal' or 'vertical'
                    range: {
                        'min': 0,
                        'max': 100000
                    },
                    format: wNumb({
                        decimals: 0
                    })
                });
                jobs.search(applicantData[0][0],salarySlider);
            });
        }
	},
	controller:function(){
		$$(".navbar a").on('click',function(){
			var data = $$(this).data('page');
			console.log(data);
			view.router.loadPage("pages/admin/"+data+".html");
			$("a").removeClass('color-teal').addClass('color-gray');
			$(this).removeClass('color-gray').addClass('color-teal')
			// content.pageContent(page+'.html');
		});
	},
	pageContent:function(url){
		var pageContent = system.ajax('pages/admin/'+url,'');
		pageContent.done(function(data){
			$$('body .views .view').html(data);
		})
	}
}
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
                        "    <div class='row'>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='account' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>list</i></a>Account"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='career' class='career btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>briefcase</i></a>Career"+
                        "        </div>"+
                        "        <div class='col-33'>"+
                        "            <a data-load='academic' class='academic btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>folder</i></a>Academic"+
                        "        </div>"+
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
        // var Ldata = language.getAll(data[0]);
        // var L ="";
        // $.each(Ldata,function(i,v){
        //     L +=""+v[2]+", ";
        // });
        // // console.log(L);
        // var Skilldata = skills.getAll(data[0]);
        // var skill ="";
        // $.each(Skilldata,function(i,v){
        //     skill +=""+v[2]+", ";
        // });
        // console.log(L);
        $$("#display_skills strong").html("skill");
        $$("#display_skills a").attr({"data-node":data[0]});
        $$("#display_language strong").html("L");
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
                var div1 = $('div.show').attr("id"),
                    div2 = $('div.edit').attr("id"),
                    FORM = $('form').attr("id"),
                    input = $('input').attr("id");
                $('#'+div2).removeClass('hidden');
                $('#'+div1).addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
                    $('#'+div2).addClass('hidden');
                    $('#'+div1).removeClass('hidden');
                    $('.input').val("");
                });
                account.edit_form(div1,div2,FORM,input);
            }
            else if(data.prop == "MiddleName"){
                $('#edit_middleName').removeClass('hidden');
                $('#display_middleName').addClass('hidden');
                $("a[data-cmd='cancel']").on('click', function(){
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Age</label>
                                                    <input type='number' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }           
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="active" for='field_${data.prop}'>Date Of Birth</label>
                                                    <input type='date' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                }           
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Place Of Birth</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Permanent Address</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Citizenship</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Height</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Weight</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }              
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Mother's Name</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Father's Name</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Language</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <div class="input-field">
                                                    <label class="active" style ="top: auto;" for='field_level'>Level</label>
                                                    <select id="field_level" name="field_level">
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Conversational">Conversational</option>
                                                        <option value="Fluent">Fluent</option>
                                                        <option value="Native">Native</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $('select').material_select();
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Religion</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Mother's Occupation</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Father's Occupation</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }             
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Skills</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                                </div>
                                            </li>                                        
                                            <li>
                                                <div class="input-field" >
                                                    <select id="field_level" name="field_level">
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advance">Advance</option>
                                                        <option value="Expert">Expert</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#editpopup").html(content);
                if(data.value != ""){
                    $('label.a').addClass("active");
                }            
                 $('select').material_select(); 
                $("#form_edit").validate({
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
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-update',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-edit');
                                    var newdata = account.get(id);
                                    account.edit(newdata);
                                    account.display(newdata);
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
    },
    edit_form:function(div1,div2,FORM,input){
        $('#'+FORM).validate({
            submitHandler: function (form) {
                var _form = $(form).serializeArray();
                var data = system.ajax(processor+'do-update',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$('input').val("");
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            var newdata = account.get(id);
                            account.display(newdata);
                            $('#'+div2).addClass('hidden');
                            $('#'+div1).removeClass('hidden');
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                })
            }
        });
    }
}
var career = {
   ini:function(){
       var applicantData = JSON.parse(localStorage.getItem('applicant'));
       var list = career.get(applicantData[0][0]);
       $$("a[data-cmd='add-career']").on('click',function(){
           career.add(applicantData[0][0]);
       });
       career.show(list);
   },
   add:function(id){
       var data = system.xml("pages/admin/pages.xml");
       $(data.responseText).find("div.popup.career").each(function(i,content){
           app.popup(content);

           $("#form_career").validate({
               rules: {
                   field_dateFirst: {required: true,maxlength:20},
                   field_dateLast: {required: true,maxlength:20},
                   field_position: {required: true,maxlength:100},
                   field_agency: {required: true,maxlength:100},
                   field_salary: {required: true,maxlength:100},
                   field_appointment: {required: true,maxlength:100},
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
                       if(data != 0){
                           $$("input").val("");
                           system.notification("Kareer","Career Added.",false,2000,true,false,function(){
                               app.closeModal('.career', true);
                           });
                       }
                       else{
                           system.notification("Kareer","Failed.",false,3000,true,false,false);
                       }
                   })
               }
           }); 
       });
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
       // console.log(list);
        var content = "";
        $.each(list,function(i,v){
           content += "<li class='collection-item'>"+
                       "   <a class='secondary-content' href='#!'><i class='icon f7-icons'>close_round</i></a>"+
                       "   <span class='title'><strong>"+v[4]+"</strong></span>"+
                       "   <p>Inclusive Date: "+v[2]+" - "+v[3]+"</p>"+
                       "   <p>Agency: "+v[5]+"</p>"+
                       "   <p>Salary: "+v[6]+"</p>"+
                       "   <p>Status: "+v[7]+"</p>"+
                       "</li>";
        });
        $$("#display_career").html("<ul class='collection'>"+content+"</ul");
        $$('a.back').on('click', function(){
            view.router.back();
            career.ini();
        });
   }
}
var academic = {
   ini:function(){
       var applicantData = JSON.parse(localStorage.getItem('applicant'));
       var list = academic.get(applicantData[0][0]);
       $$("a[data-cmd='add-career']").on('click',function(){
           academic.add(applicantData[0][0]);
       });
       academic.show(list);
   },
   add:function(id){
       var data = system.xml("pages/admin/pages.xml");
       $(data.responseText).find("div.popup.academic").each(function(i,content){
           app.popup(content);
           $('select').material_select();
           $("#form_academic").validate({
               rules: {
                   field_yearLevel: {required: true,maxlength:20},
                   field_school: {required: true,maxlength:20},
                   field_degree: {required: true,maxlength:100},
                   field_dateFirst: {required: true,maxlength:100},
                   field_dateLast: {required: true,maxlength:100},
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
                   var data = system.ajax(processor+'do-academic',[id,_form]);
                   data.done(function(data){
                       console.log(data);
                       if(data != 0){
                           $$("input").val("");
                           system.notification("Kareer","Academic Added.",false,2000,true,false,function(){
                               app.closeModal('.academic', true);
                           });
                       }
                       else{
                           system.notification("Kareer","Failed.",false,3000,true,false,false);
                       }
                   })
               }
           }); 
       });
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
           content += "<li class='collection-item'>"+
                       "   <a class='secondary-content' href='#!'><i class='icon f7-icons'>close_round</i></a>"+
                       "   <span class='title'><strong>"+v[2]+"</strong></span>"+
                       "   <p>Name of School: "+v[3]+"</p>"+
                       "   <p>Degree: "+v[4]+"</p>"+
                       "   <p>Units Earned: "+v[6]+"</p>"+
                       "   <p>Period of Attendance: "+v[5]+"</p>"+
                       "   <p>Year Graduated: "+v[7]+"</p>"+
                       "</li>";
        });
        // console.log(content);
        $$("#display_academic").html("<ul class='collection'>"+content+"</ul");
        $$('a.back').on('click', function(){
            view.router.back();
            academic.ini();
        });
   }
}
var jobs = {
    show:function(list){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        var content = "";
        var height = $(window).height();
        $.each(list,function(i,v){
         var skills = "", bookmarkButtonSettings = "";
            bookmarkButtonSettings = ($.inArray(v[0],bookmarks)>=0)?"disabled":"";

            v[5] = JSON.parse(v[5]);
         $.each(v[5],function(i2,v2){
                if(v2 != "null")
             skills += "<div class='chip'><div class='chip-media bg-teal'>J</div><div class='chip-label'>"+v2+"</div></div>";
         });

            content = "<div class='swiper-slide'>"+
                        "   <div class='card demo-card-header-pic'>"+
                        "       <div class='card-header color-white no-border' valign='bottom' style='background-image:url(img/kareer_bg.png); height: 150px;'>"+
                        "           <div class='col s8 m8 l8'>"+
                        "               <h4>"+v[1]+"<br/><small>"+v[2]+"</small>"+
                        "               </h4>"+
                        "           </div>"+
                        "           <div class='col s4 m4 l4'>"+
                        "               <button "+bookmarkButtonSettings+" data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='bookmark' class='btn-floating btn-large waves-effect waves-light purple icon f7-icons color-white' style='top: 30px;opacity:1;'>"+
                        "                   bookmark"+
                        "               </button>"+
                        "           </div>"+
                        "       </div>"+
                        "       <div class='card-content'>"+
                        "           <div class='card-content-inner' style='height:"+(height-300)+"px; overflow:hidden;'>"+
                        "               <p class='color-gray'>is in need of:</p>"+
                        "               <h5 class='color-teal'>"+v[3]+"<br/>"+
                        "                   "+skills+""+
                        "               </h5>"+
                        "               <p>"+
                        "                   <div class='description' style='white-space: normal;'>"+
                        "                       "+v[4]+""+
                        "                   </div>"+
                        "               </p>"+
                        "           </div>"+
                        "       </div>"+
                        "       <div class='card-footer'>"+
                        "           <a class='waves-effect waves-teal btn-flat hidden' href='#'>Read More</a>"+
                        "           <button data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='apply' class='waves-effect waves-light btn icon f7-icons color-white' style='background: rgb(0, 150, 136); margin: 0;'>"+
                        "               paper_plane_fill"+
                        "           </button>"+
                        "       </div>"+
                        "   </div>"+
                        "</div>";

            $("#jobs .swiper-wrapper").append(content);
         // if($('#jobs .card-content-inner')[i].scrollHeight > $('#jobs .card-content-inner').innerHeight()){
         //     console.log("x");
         // }
        });

        $("button.icon").on('click',function(){
         var _this = this;
         var data = $(this).data();
         var node = data.node;
         if(data.cmd == "bookmark"){
                console.log(data.cmd);
             var apply = system.ajax(processor+'do-bookmark',node);
             apply.done(function(e){
                    console.log(e);
                    if(e == 1){
                        system.notification("Kareer","Done.",false,2000,true,false,function(){
                         $(_this).attr({"disabled":true});
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
             })
         }

         if(data.cmd == "apply"){
             var apply = system.ajax(processor+'do-apply',node);
             apply.done(function(e){
                    console.log(e);
                    if(e == 1){
                        system.notification("Kareer","Success. Application sent.",false,2000,true,false,function(){
                         $(_this).attr({"disabled":true});
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
             })
         }
        })

        var swiper = app.swiper(".swiper-container", {
            loop: false,
            speed: 400,
            grabCursor: true,
            effect: 'coverflow',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            shortSwipes: true,
            mousewheelControl: true,
        });

        var documentHeight = $(window).height();
        $("#content .card-content").attr({"style":"height:"+(documentHeight-310)+"px; overflow:hidden; text-overflow: ellipsis;"});
    },
    applied:function(id){
        var $data = "";
        var applications = system.ajax(processor+'get-applcation',id);
        applications.done(function(data){
            localStorage.setItem('applications',data);
        });            
    },
    bookmarked:function(id){
        var bookmark = system.ajax(processor+'get-bookmarks',id);
        bookmark.done(function(data){
        localStorage.setItem('bookmarks',data);
        });
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-jobs',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    search:function(id,range){
        $("#form_search").validate({
            rules: {
                field_location: {required: true,maxlength:100},
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
                var data = system.ajax(processor+'do-searchJob',[_form[0],range.noUiSlider.get()]);
                data.done(function(data){
                    console.log(data);
                    // var display = system.xml("pages/admin/pages.xml");
                    // $(display.responseText).find("div.popup.search").each(function(i,content){
                        // app.popup(content);
                        view.router.loadPage("pages/admin/jobs.html");
                        data = JSON.parse(data);
                        console.log(data);
                        jobs.show(data);
                    // });
                })
            }
        });
    }
}