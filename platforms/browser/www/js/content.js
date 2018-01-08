var processor = 'http://localhost/Kareer_App/www/harmony/mobile.php?';
// var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
var directory = '/';
var $$ = Dom7;
var view = app.addView('.view-main');
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