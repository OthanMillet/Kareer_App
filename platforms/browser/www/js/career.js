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
       console.log(list);
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
       // $('a.home').on('click', function(){
       // 		view.router.back("pages/admin/index.html");
       // });
   }
}