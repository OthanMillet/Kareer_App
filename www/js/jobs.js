var self = this;
var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
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
                skills += "<div class='chip'><div class='chip-media bg-teal'></div><div class='chip-label'>"+v2+"</div></div>";
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
                        "               <div class='left'>"+v[3]+"</div>"+
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
        $("a.home").on('click',function(){
            var data = $(this).data('load');
            view.router.loadPage("pages/admin/"+data+".html");
        });

        app.onPageBack('index',function(page){
            account.ini();
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
                console.log("chu");
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
    getBookmarked:function(id){
        var $data = "";
        var jobs = system.ajax(processor+'get-Bjobs',id);
        jobs.done(function(data){
            $data = data;
        });
        return JSON.parse($data);
    },
    search:function(id,range){
        $("#form_search").validate({
            rules: {
                field_location: {required: true,maxlength:100, minlength:4},
                field_skill: {required: true,maxlength:100, minlength:3},

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
                var data = system.ajax(processor+'do-searchJob',[_form[0],range.noUiSlider.get(),_form[1]]);
                data.done(function(data){
                    console.log(data);
                    view.router.loadPage("pages/admin/jobs.html");
                    var applicant = JSON.parse(localStorage.getItem('applicant'));
                    var appliedList = jobs.applied(applicant[0][0]);
                    var bookmarkedList = jobs.bookmarked(applicant[0][0]);
                    data = JSON.parse(data);
                    jobs.show(data);
                })
            }
        });
    }
}