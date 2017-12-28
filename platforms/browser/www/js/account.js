var self = this;
var processor = 'http://localhost/KAPP/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
var account = function(){
    "use strict";
    return {
    	ini:function(){
    		var applicantData = JSON.parse(localStorage.getItem('applicant'));
    		jobs.bookmarked(applicantData[0][0]);
    		$("#index img.responsive-img").attr({"src":"img/profile/"+applicantData[0][24]});

    		var content = "<div class='content-block'>"+
    						"    <p class='color-gray'><h5>"+applicantData[0][7]+" "+applicantData[0][8]+"</h5></p>"+
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
    						"            <a data-load='career' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>briefcase</i></a>Career"+
    						"        </div>"+
    						"        <div class='col-33'>"+
    						"            <a data-load='academic' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>folder</i></a>Academic"+
    						"        </div>"+
    						"    </div>"+
    						"</div>";
    		$("#display_account").html(content);

    		$("a.account").on('click',function(){
    			var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
    		});

            app.onPageInit('academic',function(page){
                console.log('page');
                academic.ini();
            });         

            app.onPageInit('account',function(page){
                console.log('page');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.account(data);
            });

            app.onPageInit('career',function(page){
                console.log('page');
                career.ini();
            });
    	},
        account:function(data){
            console.log(data);
            $$("#display_givenName").html(data[7]);
            $$("#display_middleName").html(data[9]);
            $$("#display_lastName").html(data[8]);
            $$("#display_gender").html(data[10]);
            $$("#display_dateOfBirth").html(data[12]);
            $$("#display_placeOfBirth").html(data[13]);
            $$("#display_address").html(data[14]);
            $$("#display_citizenship").html(data[15]);
            $$("#display_weight").html(data[17]);
            $$("#display_height").html(data[16]);
            $$("#display_mother").html(data[18]);
            $$("#display_father").html(data[19]);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-applicant',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        }
    }
}();