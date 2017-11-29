$(document).ready(function(){
   //Hide the #Abut section

    
    
                    $("#facebookBtn").click(function(){
                        $("#team,#Update").show();
                    });


                //DATA FATCHING FROM FACEBOOK API
                //
                var myFacebookToken = 'EAACEdEose0cBAObywGa7RjQ4TmjZBEJkoIbv4O34f37uZCaUxfyPN5VuXm0ZACfu5fiP7FYYKip6J3xz6zZAqAMtGJnvZAV1b7JxfBBzCNoZB6jLDLPvVPICc0rX13jjtCHbYDjvqyoKCOkylxGmAklqAeXw9AKHUogFtYSClVDT2NUdJ0Fge6KyzClM9iVKtdne4ZA6HrafAZDZD';

                    function getFacebookInfo(){

                       $.ajax('https://graph.facebook.com/me?fields=id,name,education,feed,email,hometown,gender&access_token='+myFacebookToken,{

                                success : function(response){
                                    console.log(response);
                                    console.log(typeof(response));
                                    $("#myEmail").text(response.email);//NOT VISIABLE
                                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');//Url for user facebook link
                                    $("#myHomeTown").text(response.hometown.name);//HomeTown

                                     $("#gender").text(response.gender);//Gengder
                                      
                                       $("#myName").text(response.name);
                                      //Takign Feed From Facebook Api
                                      $(".media-body").text(" ");
                     for(var i = 0; i < response.feed.data.length; i++){
                           $('.media-body').append('<h4 class="media-heading">  '+response.feed.data[i].id+'</h4><p><strong>Time: </strong>'+response.feed.data[i].created_time+'</p><p>'+response.feed.data[i].message+'</p>');
                     };
                                      

                                        






                                }
                            }//end argument list 



                    );// end ajax call 


    }// end get facebook info

    $("#facebookBtn").on('click',getFacebookInfo)


//FAcebook update


jQuery.each( obj, function( i, val ) {
  $( "#" + i ).append( document.createTextNode( " - " + val ) );
});




//Send Mail to the User

$('.loader').hide();

    function sendFormData(event){

    		var mail='sou93rock@gmail.com';
        // prevent the default behaviour of the form
        event.preventDefault();
        console.log($('form').serialize());
        $.ajax('https://api.edwisor.com/api/v1/public/send/mail/'+ mail,{

                type:'POST',
                data: $('form').serialize(),
                dataType: "json",
                success : function(response){
                    console.log(response);
                    alert("Data success");
                    $('form').remove();
                    document.write('<h2>'+response.userMessage+'</h2>')
                },
                error : function(request,errorType,errorMessage){
                    console.log(request);
                    console.log(errorType);
                    document.write('<h2>'+response.userMessage+'</h2>')
                },
                timeout:3000,
                beforeSend : function(){
                    $('.loader').show();
                },
                complete : function(){
                   $('.loader').hide();

                }

            }//end argument list 



        );// end ajax call 


    }// end get facebook info

    $("form").on('submit',sendFormData)



});