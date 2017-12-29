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
        });
        academic.show(list);

        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        app.onPageInit('index',function(page){
            account.controller();
        });
    },
    add:function(id){
        app.popup('.popup-academic');
        $('#field_yearLevel').material_select();

        $("#field_yearLevel").on('change', function() {
            var value = $(this).val();
            if ((value == 'Elementary') || (value == 'High School')){
                $('#degree div').addClass('hidden');
                $('#units div').addClass('hidden');
            }
            else if ((value == 'Tech Voc') || (value == 'College') || (value == 'Masteral') || (value == 'Doctorate')){
                $('#degree div').removeClass('hidden');
                $('#units div').removeClass('hidden');
            }
        });

        $("#form_academic").validate({
            rules: {
                field_yearLevel: {required: true,maxlength:20},
                field_school: {required: true,maxlength:100},
                field_degree: {required: true,maxlength:100},
                field_units: {required: true,maxlength:3,},
                field_dateFrom: {required: true, maxlength:20},
                field_dateTo: {required: true, maxlength:20, greaterThan: "#field_dateFrom"},
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
                            app.closeModal('.popup-academic');
                            academic.ini();
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
            $('li.degree').addClass('hidden');
            $('li.units').addClass('hidden');
        }
        else if ((a[0][2] == 'Tech Voc') || (a[0][2] == 'College') || (a[0][2] == 'Masteral') || (a[0][2] == 'Doctorate')){
            $('li.degree').removeClass('hidden');
            $('li.units').removeClass('hidden');
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
        });
    },
    delete:function(a){
        var id = a[0][0];
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
        $("#deletePopup").html(`<div class="card-content">${content}</div>`);
        $("a[data-cmd='proceed']").on('click',function(){
            var acad = system.ajax(processor+'do-deleteAcad',id);
            acad.done(function(data){
                if(data != 0){
                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                        app.closeModal('.popup-delete');
                        academic.ini();
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
    edit:function(a){
        $$("a[data-cmd='update']").on('click',function(){
            var data = $(this).data();
            var id = data.node;
            app.popup('.popup-update');
            if(data.prop == "Year"){
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field" style='border: gray; border-width: 1px; background-color: rgba(238, 238, 238, 0.15); border-style: solid; border-radius: 15px;'>
                                                    <select id="field_yearLevel" name="field_yearLevel">
                                                        <option value="Elementary">ELEMENTARY</option>
                                                        <option value="High School">HIGH SCHOOL</option>
                                                        <option value="Tech Voc">TECH VOC</option>
                                                        <option value="College">COLLEGE</option>
                                                        <option value="Masteral">MASTERAL</option>
                                                        <option value="Doctorate">DOCTORATE</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateAcad").html(content);
                $('select').material_select();
                $("#form_edit").validate({
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
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = academic.get(id);
                                    academic.edit(newdata);
                                    academic.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='text' id="field_school" name="field_school" class="form-control">
                                                    <label class="" for="field_school" style="color: black; top: -2px !important; left: 0px !important;">Name of Schools</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateAcad").html(content);
                $("#form_edit").validate({
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
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = academic.get(id);
                                    academic.edit(newdata);
                                    academic.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                 <div class="input-field">
                                                    <input type='text' id="field_degree" name="field_degree" class="form-control">
                                                    <label class="" for="field_degree" style="color: black; top: -2px !important; left: 0px !important;">Basic Education/Degree/Course</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateAcad").html(content);
                $("#form_edit").validate({
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
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = academic.get(id);
                                    academic.edit(newdata);
                                    academic.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <input type='number' id="field_units" name="field_units" class="form-control">
                                                    <label class="" for="field_units" style="color: black; top: -2px !important; left: 0px !important;">Units Earned</label>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateAcad").html(content);
                $("#form_edit").validate({
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
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = academic.get(id);
                                    academic.edit(newdata);
                                    academic.display(newdata);
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
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div>
                                                    <div class="input-field">
                                                        <label class="active" style="top: auto; left: 0px; font-size: 17px; color: black;">Period of Attendance (From - To)</label>
                                                        <div>
                                                            <input type='month' id="field_dateF"  name="field_dateF" class="form-control" style="width: 100%;">
                                                        </div>
                                                        <div>
                                                            <input type='month' id="field_dateT" name="field_dateT" class="form-control" style="width: 100%;">
                                                        </div>
                                                    </div>                                            
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateAcad").html(content);
                $("#form_edit").validate({
                    rules: {
                        field_dateF: {required: true, maxlength:20},
                        field_dateT: {required: true, maxlength:20, greaterThan: "#field_dateF"},
                        // field_dateTo: { greaterThan: "#field_dateFrom" },
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
                        var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = academic.get(id);
                                    academic.edit(newdata);
                                    academic.display(newdata);
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