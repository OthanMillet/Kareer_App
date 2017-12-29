var self = this;
var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var system = {
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
let skills = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var list = skills.getAll(applicantData[0][0]);
        $$("a[data-cmd='add-skills']").on('click',function(){
            skills.add(applicantData[0][0]);
        });
        skills.show(list);
        // skills.delete(list);

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        app.onPageInit('index',function(page){
            account.controller();
        });
    },
    getAll:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-skillsAll',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-skill',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    add:function(id){
        app.popup('.popup-skill');
        $('select').material_select('close');

        $("#form_skills").validate({
            rules: {
                field_skill: {required: true,maxlength:100},
                field_level: {required: true,maxlength:50}
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
                var data = system.ajax(processor+'do-skill',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$("input").val("");
                        system.notification("Kareer","Skill Added.",false,2000,true,false,function(){
                            app.closeModal('.popup-skill');
                            skills.ini();
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                })
            }
        }); 
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
                        "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                        "   </div>"+
                        "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                        "</li>";

                $("a.skills").removeClass('disabled');
        });
        $$("#display_skills").html("<ul class='collection'>"+content+"</ul");
        $("a[data-cmd='view']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            var s = skills.get(id);
            skills.display(s);
            skills.edit(s);
            $('div.display').addClass('hidden');
            $('div.focus').removeClass('hidden');
            $('.card-header a').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
        $("a.skills").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            app.onPageInit('builderLanguage',function(page){
                language.ini();
            });
        });
    },
    display:function(s){
        $$("#display_skill strong").html(s[0][2]);
        $$("#display_skill a").attr({"data-node":s[0][0]});
        $$("#display_level strong").html(s[0][3]);
        $$("#display_level a").attr({"data-node":s[0][0]});   

        $$("a[data-cmd='back']").on('click',function(){
            skills.ini();
            $('div.display').removeClass('hidden');
            $('div.focus').addClass('hidden');
            $('.card-header a').removeClass('hidden');
            $('div.NAV').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $$("a[data-cmd='delete']").on('click',function(){
            skills.delete(s);
        });
    },
    edit:function(s) {
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = s[0][0];
            app.popup('.popup-update');
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
            $("#updateSkill").html(content);
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
                    var data = system.ajax(processor+'do-updateSkill',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                app.closeModal('.popup-update');
                                var newdata = skills.get(id);
                                skills.edit(newdata);
                                skills.display(newdata);
                            });

                        }
                        else{
                            system.notification("Update","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            });
        });
    },
    delete:function (s) {
        var id = s[0][0];
        app.popup('.popup-delete');
        var content =   `<ul>
                            <li>
                                <h5 class = 'center'>Are you sure?
                                </h5>
                            </li>
                            <li>
                                <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                            </li>
                        </ul>`;
        $("#deleteSkill").html(`<div class="card-content">${content}</div>`);
        $("a[data-cmd='proceed']").on('click',function(){
            var acad = system.ajax(processor+'do-deleteSkill',id);
            acad.done(function(data){
                if(data != 0){
                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                        app.closeModal('.popup-delete');
                        skills.ini();
                        $('div.display').removeClass('hidden');
                        $('div.focus').addClass('hidden');
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
    }
}

let language = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var list = language.getAll(applicantData[0][0]);
        $$("a[data-cmd='add-language']").on('click',function(){
            language.add(applicantData[0][0]);
        });
        language.show(list);

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            account.controller(data);
        });

        app.onPageInit('index',function(page){
            account.controller();
        });
    },
    getAll:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-languageALL',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-language',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    add:function(id){
        app.popup('.popup-language');
        $('select').material_select();
        $("#form_language").validate({
            rules: {
                field_language: {required: true,maxlength:100},
                field_level: {required: true,maxlength:50}
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
                var data = system.ajax(processor+'do-language',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$("input").val("");
                        system.notification("Kareer","Language Added.",false,2000,true,false,function(){
                            app.popup('.popup-language');
                            language.ini();
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                })
            }
        }); 
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
                        "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                        "   </div>"+
                        "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                        "</li>";

                $("a.language").removeClass('disabled');
        });
        $$("#display_language").html("<ul class='collection'>"+content+"</ul");
        $("a[data-cmd='view']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            var l = language.get(id);
            language.display(l);
            language.edit(l);
            $('div.display').addClass('hidden');
            $('div.focus').removeClass('hidden');
            $('.card-header a').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
        $("a.language").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });
        app.onPageInit('builderReferences',function(page){
            references.ini();
        });
    },
    display:function(l) {
        $$("#display_language strong").html(l[0][2]);
        $$("#display_language a").attr({"data-node":l[0][0]});
        $$("#display_level strong").html(l[0][3]);
        $$("#display_level a").attr({"data-node":l[0][0]});   

        $$("a[data-cmd='back']").on('click',function(){
            language.ini();
            $('div.display').removeClass('hidden');
            $('div.focus').addClass('hidden');
            $('.card-header a').removeClass('hidden');
            $('div.NAV').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $$("a[data-cmd='delete']").on('click',function(){
            language.delete(l);
        });
    },
    edit:function(l){
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = l[0][0];
            app.popup('.popup-update');
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
            $("#updateLanguage").html(content);
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
                    field_Skills: {
                        required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-updateLanguage',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                app.closeModal('.popup-update');
                                var newdata = language.get(id);
                                language.edit(newdata);
                                language.display(newdata);
                            });

                        }
                        else{
                            system.notification("Update","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            });
        });
    },
    delete:function(l){
        var id = l[0][0];
        app.popup('.popup-delete');
        var content =   `<ul>
                            <li>
                                <h5 class = 'center'>Are you sure?
                                </h5>
                            </li>
                            <li>
                                <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                            </li>
                        </ul>`;
        $("#deleteLanguage").html(`<div class="card-content">${content}</div>`);
        $("a[data-cmd='proceed']").on('click',function(){
            var acad = system.ajax(processor+'do-deleteLanguage',id);
            acad.done(function(data){
                if(data != 0){
                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                        app.closeModal('.popup-delete');
                        language.ini();
                        $('div.display').removeClass('hidden');
                        $('div.focus').addClass('hidden');
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
    }
}

let references = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var list = references.getAll(applicantData[0][0]);
        $$("a[data-cmd='add-reference']").on('click',function(){
            references.add(applicantData[0][0]);
        });
        references.show(list);

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            account.controller(data);
        });

        app.onPageInit('index',function(page){
            account.controller();
        });
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-reference',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    getAll:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-referencesAll',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    add:function(id){
        app.popup('.popup-reference');
        $("#form_references").validate({
            rules: {
                field_name: {required: true,maxlength:100},
                field_relationship: {required: true,maxlength:100},
                field_profession: {required: true,maxlength:100},
                field_email: {required: true,maxlength:100},
                field_phone: {required: true,maxlength:100},
                field_address1: {required: true,maxlength:100},
                // field_address2: {maxlength:100}
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
                var data = system.ajax(processor+'do-references',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$("input").val("");
                        system.notification("Kareer","References Added.",false,2000,true,false,function(){
                            app.closeModal('.popup-reference');
                            references.ini();
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                })
            }
        }); 
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
                        "   <div class ='color-teal' ><small class ='color-black'>"+v[7]+"</small></div>"+
                        "   </div>"+
                        "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                        "</li>";

                $("a.references").removeClass('disabled');
        });
        $$("#display_references").html("<ul class='collection'>"+content+"</ul");
        $("a[data-cmd='view']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            var r = references.get(id);
            references.display(r);
            references.edit(r);
            $('div.display').addClass('hidden');
            $('div.focus').removeClass('hidden');
            $('.card-header a').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
        $("a.references").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });
        app.onPageInit('builderSeminar',function(page){
            seminar.ini();
        });
    },
    display:function(r) {
        $$("#display_name strong").html(r[0][2]);
        $$("#display_name a").attr({"data-node":r[0][0]});
        $$("#display_relationship strong").html(r[0][3]);
        $$("#display_relationship a").attr({"data-node":r[0][0]});
        $$("#display_profession strong").html(r[0][4]);
        $$("#display_profession a").attr({"data-node":r[0][0]});
        $$("#display_email strong").html(r[0][5]);
        $$("#display_email a").attr({"data-node":r[0][0]});
        $$("#display_phone strong").html(r[0][6]);
        $$("#display_phone a").attr({"data-node":r[0][0]});
        $$("#display_address strong").html(r[0][7]);
        $$("#display_address a").attr({"data-node":r[0][0]}); 

        $$("a[data-cmd='back']").on('click',function(){
            references.ini();
            $('div.display').removeClass('hidden');
            $('div.focus').addClass('hidden');
            $('.card-header a').removeClass('hidden');
            $('div.NAV').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $$("a[data-cmd='delete']").on('click',function(){
            references.delete(r);
        });
    },
    delete:function(r){
        var id = r[0][0];
        app.popup('.popup-delete');
        var content =   `<ul>
                            <li>
                                <h5 class = 'center'>Are you sure?
                                </h5>
                            </li>
                            <li>
                                <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                            </li>
                        </ul>`;
        $("#deleteReference").html(`<div class="card-content">${content}</div>`);
        $("a[data-cmd='proceed']").on('click',function(){
            var acad = system.ajax(processor+'do-deleteReference',id);
            acad.done(function(data){
                if(data != 0){
                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                        app.closeModal('.popup-delete');
                        references.ini();
                        $('div.display').removeClass('hidden');
                        $('div.focus').addClass('hidden');
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
    edit:function(r){
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = r[0][0];
            app.popup('.popup-update');
            if(data.prop == "Name"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_name" name="field_name" class="form-control">
                                                    <label class="" for="field_name" style="color: black !important; top: -2px !important; left: 0px !important;">Name</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_name: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Relationship"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_relationship" name="field_relationship" class="form-control">
                                                    <label class="" for="field_relationship" style="color: black !important; top: -2px !important; left: 0px !important;">Relationship</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_relationship: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Profession"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_profession" name="field_profession" class="form-control">
                                                    <label class="" for="field_profession" style="color: black !important; top: -2px !important; left: 0px !important;">Profession</label>
                                                </div
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_profession: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Email"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_email" name="field_email" class="form-control">
                                                    <label class="" for="field_email" style="color: black !important; top: -2px !important; left: 0px !important;">Email</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_email: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Phone"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_phone" name="field_phone" class="form-control">
                                                    <label class="" for="field_phone" style="color: black !important; top: -2px !important; left: 0px !important;">Phone</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_name: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Address"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_address" name="field_address" class="form-control">
                                                    <label class="" for="field_address" style="color: black !important; top: -2px !important; left: 0px !important;">Address</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateReference").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_address: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateReference',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = references.get(id);
                                    references.edit(newdata);
                                    references.display(newdata);
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

let seminar = {
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var list = seminar.getAll(applicantData[0][0]);
        $$("a[data-cmd='add-seminar']").on('click',function(){
            seminar.add(applicantData[0][0]);
        });
        seminar.show(list);

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            account.controller(data);
        });

        app.onPageInit('index',function(page){
            account.controller();
        });
    },
    getAll:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-seminarAll',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    get:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-seminar',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    add:function(id){
        app.popup('.popup-seminar');
        $("#form_seminars").validate({
            rules: {
                field_event: {required: true,maxlength:100},
                field_location: {required: true,maxlength:100},
                field_date: {required: true,maxlength:100}
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
                var data = system.ajax(processor+'do-seminar',[id,_form]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        $$("input").val("");
                        system.notification("Kareer","seminar Added.",false,2000,true,false,function(){
                            app.closeModal('.popup-seminar');
                            seminar.ini();
                        });
                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                })
            }
        }); 
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
                        "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                        "   </div>"+
                        "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                        "</li>";

                $("a.seminar").removeClass('disabled');
        });
        $$("#display_seminars").html("<ul class='collection'>"+content+"</ul");
        $("a[data-cmd='view']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            var s = seminar.get(id);
            seminar.display(s);
            seminar.edit(s);
            $('div.display').addClass('hidden');
            $('div.focus').removeClass('hidden');
            $('.card-header a').addClass('hidden');
            $('div.NAV ').addClass('hidden');
            $('div.TOOL').addClass('hidden');
        });
        $("a.seminar").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });
        app.onPageInit('resumePreview',function(page){
            resume.page();
        });
    },
    display:function(s) {console.log(s);
        $$("#display_event strong").html(s[0][2]);
        $$("#display_event a").attr({"data-node":s[0][0]});
        $$("#display_location strong").html(s[0][3]);
        $$("#display_location a").attr({"data-node":s[0][0]});
        $$("#display_date strong").html(s[0][4]);
        $$("#display_date a").attr({"data-node":s[0][0]});

        $$("a[data-cmd='back']").on('click',function(){
            seminar.ini();
            $('div.display').removeClass('hidden');
            $('div.focus').addClass('hidden');
            $('.card-header a').removeClass('hidden');
            $('div.NAV').removeClass('hidden');
            $('div.TOOL').removeClass('hidden');
        });
        $$("a[data-cmd='delete']").on('click',function(){
            seminar.delete(s);
        });
    },
    delete:function(s){
        var id = s[0][0];
        app.popup('.popup-delete');
        var content =   `<ul>
                            <li>
                                <h5 class = 'center'>Are you sure?
                                </h5>
                            </li>
                            <li>
                                <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                            </li>
                        </ul>`;
        $("#deleteSeminar").html(`<div class="card-content">${content}</div>`);
        $("a[data-cmd='proceed']").on('click',function(){
            var acad = system.ajax(processor+'do-deleteSeminar',id);
            acad.done(function(data){
                if(data != 0){
                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                        app.closeModal('.popup-delete');
                        seminar.ini();
                        $('div.display').removeClass('hidden');
                        $('div.focus').addClass('hidden');
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
    edit:function(s){
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = s[0][0];
            app.popup('.popup-update');
            if(data.prop == "Event"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_event" name="field_event" class="form-control">
                                                    <label class="" for="field_event" style="color: black !important; top: -2px !important; left: 0px !important;">Event</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateSeminar").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_event: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = seminar.get(id);
                                    seminar.edit(newdata);
                                    seminar.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Location"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_location" name="field_location" class="form-control">
                                                    <label class="" for="field_location" style="color: black !important; top: -2px !important; left: 0px !important;">Location</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateSeminar").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_location: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = seminar.get(id);
                                    seminar.edit(newdata);
                                    seminar.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            }
            else if(data.prop == "Date"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='date' id="field_date" name="field_date" class="form-control">
                                                    <label class="active" for="field_date" style="color: black !important; top: -2px !important; left: 0px !important;">Date</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateSeminar").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_date: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = seminar.get(id);
                                    seminar.edit(newdata);
                                    seminar.display(newdata);
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

let resume ={
    ini:function(){
        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var data = resume.get(applicantData[0][0]);
        let content =   `<div><img src="./img/RES.png" style="width: 200px; position: relative; margin-top: 40px;" ></div>
                        <p style="font-size: 17px">Make my Resume</p>
                        <div class="center">
                            <a data-load ='builderAccount' class="resume btn btn-large white-text waves-effect waves-teal waves-light" style="border-radius: 30px; width: 90%; height: 55px; font-size: 20px; margin-top: 25px; background-color: #5cb0a8;">Create Resume</a>
                            <a data-load ='SavedResume' class="resume btn btn-large white-text waves-effect waves-purple waves-light" style="border-radius: 30px;width: 90%;height: 55px; font-size: 20px; margin-top: 15px; background-color: #7a5578;">Saved Resume</a>
                        </div>`;
        $$("#resume_builder").html(content);

        $("a.resume").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        app.onPageInit('builderAccount',function(page){
            console.log('page'); 
            $("a.acc").removeClass('color-grey').addClass('color-white');
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var data = resume.get(applicantData[0][0]);
            account.edit(data);
            account.display(data);
            account.show(data);

        });
        app.onPageInit('SavedResume',function(page){
            console.log('page');
            var res = resume.getResume(applicantData[0][0]);
            resume.savedResume(res);
        });


        app.onPageInit('index',function(page){
            account.controller();
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
    getResume:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-resume',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    savedResume:function(res){
        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
            // console.log("dfdfdd");
        });
        $$("#resume strong").html(res[0][0]);

        app.onPageInit('resume',function(page){
            account.controller();
            resume.ini();
        });
    },
    page:function(){
        $("a.preview").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        app.onPageInit('builderSeminar',function(page){
            seminar.ini();
        });
        app.onPageInit('Preview',function(page){
            resume.preview();
        });
    },
    preview:function(){
        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });
        app.onPageInit('resumePreview',function(page){
            resume.page();
        });

        var applicantData = JSON.parse(localStorage.getItem('applicant'));
        var personalInfo = account.get(applicantData[0][0]);
        // console.log(personalInfo);
        var Ldata = language.getAll(personalInfo[0]);
        // console.log(Ldata);
        var L ="";
        $.each(Ldata,function(i,v){
            L +=""+v[2]+", ";
        });
        $$("#display_fullname strong").html(personalInfo[8]+","+personalInfo[7]+" "+personalInfo[9]);
        $$("#display_address small").html(personalInfo[14]);
        $$("#display_phone small").html("09123456789");
        $$("#display_email small").html(personalInfo[3]);
        $$("#Preview img.responsive-img").attr({"src":"img/profile/"+personalInfo[24]});
        var personalcontent = "<div class='col s12'>"+
                              "   <div >Date of Birth: <span class ='color-black'>"+personalInfo[12]+"</span></div>"+
                              "   <div >Age: <span class ='color-black'>"+personalInfo[11]+"</span></div>"+
                              "   <div >Mother: <span class ='color-black'>"+personalInfo[18]+"</span></div>"+
                              "   <div >Father: <span class ='color-black'>"+personalInfo[19]+"</span></div>"+
                              "   <div >Religion: <span class ='color-black'>"+personalInfo[21]+"</span></div>"+
                              "   <div >Citizenship: <span class ='color-black'>"+personalInfo[15]+"</span></div>"+
                              "   <div >Place of Birth: <span class ='color-black'>"+personalInfo[13]+"</span></div>"+
                              "   <div >Gender: <span class ='color-black'>"+personalInfo[10]+"</span></div>"+
                              "   <div >Mother's Occupation: <span class ='color-black'>"+personalInfo[22]+"</span></div>"+
                              "   <div >Father's Occupation: <span class ='color-black'>"+personalInfo[23]+"</span></div>"+
                              "   <div >Language: <span class ='color-black'>"+L+"</span></div>"+
                              "   <div >Height: <span class ='color-black'>"+personalInfo[16]+"</span></div>"+
                              "   <div >Weight: <span class ='color-black'>"+personalInfo[17]+"</span></div>"+
                              "</div>";
        $$("#display_personalInfo").html(personalcontent);

        var acad = academic.getAll(applicantData[0][0]);
        var acadcontent = "";
        $.each(acad,function(i,v){
            acadcontent +=  "<span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                        "   <div >Name of School: <span class ='color-black'>"+v[3]+"</span></div>"+
                        "   <div >Period of Attendance: <span class ='color-black'>"+v[5]+"</span></div>"+
                        "   <div >Year Graduated: <span class ='color-black'>"+v[7]+"</span></div>";
        });
        $$("#display_academic").html(acadcontent);

        var car = career.getAll(applicantData[0][0]);
        var carcontent = "";
        $.each(car,function(i,v){
            carcontent +=   "   <span class='title'><strong class ='color-black'>"+v[4]+"</strong></span>"+
                            "   <div><span class ='color-black'>"+v[2]+" - "+v[3]+"</span></div>"+
                            "   <div><span class ='color-black'>"+v[5]+"</span></div>";
        });
        $$("#display_career").html(carcontent);

        var skill = skills.getAll(applicantData[0][0]);
        var skillcontent = "";
        $.each(skill,function(i,v){
            skillcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                            "   <div><span class ='color-black'>"+v[3]+"</span></div>";
        });
        $$("#display_skills").html(skillcontent);

        var sem = seminar.getAll(applicantData[0][0]);
        var semcontent = "";
        $.each(sem,function(i,v){
            semcontent +=  "<span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                        "   <div><span class ='color-black'>"+v[3]+"</span></div>"+
                        "   <div><span class ='color-black'>"+v[4]+"</span></div>";
        });
        $$("#display_seminar").html(semcontent);

        var reference = references.getAll(applicantData[0][0]);
        var refcontent = "";
        $.each(reference,function(i,v){
            refcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                          "   <div><span class ='color-black'>"+v[4]+"</span></div>"+
                          "   <div><span class ='color-black'>"+v[5]+"</span></div>"+
                          "   <div><span class ='color-black'>"+v[7]+"</span></div>";
        });
        $$("#display_references").html(refcontent);
        //PDF generation function
        (function () {  
            var  
             form = $('.list-block'),  
             cache_width = form.width(),  
             legal = [595.28, 975]; // for legal size paper width and height  
      
            $('#create_pdf').on('click', function () {  
                $('body').scrollTop(0);
                createPDF();
                upload();

            });  
            //create pdf  
            function createPDF() {  
                getCanvas().then(function (canvas) {  
                    var  
                     img = canvas.toDataURL("image/png"),  
                     doc = new jsPDF({  
                         unit: 'in',  
                         format: 'legal'  
                     });  
                    doc.addImage(img, 'JPEG', 3, 3);  
                    doc.save('resume.pdf');
                    form.width(cache_width);
                });  
            }  
      
            // create canvas object  
            function getCanvas() {  
                form.width((legal[0] * 1.33333) - 80).css('max-width', 'none');  
                return html2canvas(form, {  
                    imageTimeout: 1000,  
                    removeContainer: true  
                });  
            }  
            function upload(){
                var doc = new jsPDF();
                var pdf = doc.output(); 
                var ajax = system.ajax(processor+'do-resume',[applicantData[0][0],pdf]);
                ajax.done(function(data){
                    console.log(data);
                    if(data != 0){
                        system.notification("Kareer","Resume Published.",false,2000,true,false,function(){
                            view.router.loadPage("pages/admin/index.html");
                                content.ini();
                        });
                        // console.log(data);
                    }
                    else{
                       system.notification("Kareer","Failed.",false,3000,true,false,false);
                        // console.log(data);
                    }
                });
            }    
        }());  
    }
}