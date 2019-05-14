var $ = jQuery;

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$(document).ready(function() {
    
    $('#login-form').submit(function(event) {
        event.preventDefault();
        const username = $('#user_login').val();
        const password = $('#user_pass').val();
        $.post("/login", {username, password},  function(data) {
            $('#user_login').val('');
            $('#user_pass').val('');
        });
    });
    $("#goto-signup").click(function(){
        $('#login-form').hide();
        $('#signup-form').show();
    });
    $("#goto-login").click(function(){
        $('#login-form').show();
        $('#signup-form').hide();
    });
    $('#signup-form').submit(function(event) {
        event.preventDefault();
        const username = $('#new_login').val();
        const password = $('#new_pass').val();
        const email = $('#new_email').val();
        const firstName = $('#first_name').val();
        const lastName = $('#last_name').val();
        $.post("/users", {username, password, email, firstName, lastName},  function(data) {
            $('#new_login').val('');
            $('#new_pass').val('');
            $('#new_email').val('');
            $('#first_name').val('');
            $('#last_name').val('');
        });
    });
    const socket = io();
    socket.on('login-successful', function(data) {
        document.cookie = "username=" + data.username;
        window.location.href = "./home.html";

    });
    const username = getCookie('username');

    if(username){
        $.get(`/events/user/${username}`, function(data) {
        
            $('#events_list').html(
                data.map(function(single){
                    let result = `<li class="list-group-item">
                    <h3>${single.name}</h3>`
                    if(single.date){
                        result += `<p><strong>On: </strong>${single.date}</p>`;
                    }
                    if(single.venue){
                        result += `<p><strong>Venue: </strong>${single.venue}</p>`;
                    }
                    if(single.price){
                        result += `<p><strong>Price: </strong>${single.price}</p>`;
                    }
                    if(single.description){
                        result += `<p><strong>Description: </strong>${single.description}</p>`;
                    }
                    if(single.reminder){
                        result += `<p><strong>Reminder on: </strong>${single.reminder}</p>`;
                    }
                    result += `
                    <p class="delete_event">
                        <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
                    </p>
                    </li>`;
                    return result;
                })
            );
            

        });
        
        $.get(`/schedules/user/${username}`, function(data) {
        
            $('#schedule_list').html(
                data.map(function(single){
                    let result = `<li class="list-group-item">
                    <h3>${single.name}</h3>`
                    if(single.description){
                        result += `<p><strong>Description: </strong>${single.description}</p>`;
                    }
                    result += `
                    <p class="delete_event">
                        <input type="submit" name="delete" class="button btn btn-danger" value="Delete Schedule">
                    </p>
                    </li>`;
                    return result;
                })
            );
            

        });

    }

    $('#event_toggle').click(()=>{
        $('#event-form').show();
        $('#event_toggle').hide();
    });

    $('#schedule_toggle').click(()=>{
        $('#schedule_form').show();
        $('#schedule_toggle').hide();
    });
    
    $('#cancel_event').click(()=>{
        $('#event_name').val('');
        $('#event_date').val('');
        $('#event_reminder').val('');
        $('#event_venue').val('');
        $('#event_price').val('');
        $('#event_desc').val('');
        $('#event-form').hide();
        $('#event_toggle').show();

    });
    $('#cancel_schedule').click(()=>{
        $('#schedule_name').val('');
        $('#schedule_desc').val('');
        $('#schedule_form').hide();
        $('#schedule_toggle').show();

    });
    $(document).on('click','.delete_event', function(){
        let name = $(this).parent().find('h3').get( 0 ).innerHTML;
        $(this).parent().css("display", "none");
        $.post("/events/delete", {name},  function(data) {
            
        });
    });
    $('#event-form').submit((event)=>{
        event.preventDefault();
        const name = $('#event_name').val();
        const date = $('#event_date').val();
        const reminder = $('#event_reminder').val();
        const venue = $('#event_venue').val();
        const price = $('#event_price').val();
        const description = $('#event_desc').val();
        const host = getCookie('username');
        $.post("/events", {name, date, reminder, venue, price, description, host},  function(data) {
            $('#event_name').val('');
            $('#event_date').val('');
            $('#event_reminder').val('');
            $('#event_venue').val('');
            $('#event_price').val('');
            $('#event_desc').val('');
            $('#event-form').hide();
            $('#event_toggle').show();
            let result = `<li class="list-group-item"><h3>${name}</h3>`;
            if(date){
                result += `<p><strong>On: </strong>${date}</p>`;
            }
            if(venue){
                result += `<p><strong>Venue: </strong>${venue}</p>`;
            }
            if(price){
                result += `<p><strong>Price: </strong>${price}</p>`;
            }
            if(description){
                result += `<p><strong>Description: </strong>${description}</p>`;
            }
            if(reminder){
                result += `<p><strong>Reminder on: </strong>${reminder}</p>`;
            }
            result += `<p class="delete_event">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
                </p>
                </li>`;
            $('#events_list').append(result);
        });
    });
    $('#schedule_form').submit((event)=>{
        event.preventDefault();
        const name = $('#schedule_name').val();
        const description = $('#schedule_desc').val();
        const username = getCookie('username');
        $.post("/schedules", {name, description, username},  function(data) {
            $('#schedule_name').val('');
            $('#schedule_desc').val('');
            $('#schedule_form').hide();
            $('#schedule_toggle').show();
            let result = `<li class="list-group-item"><h3>${name}</h3>`;
            if(description){
                result += `<p><strong>Description: </strong>${description}</p>`;
            }
            result += `<p class="delete_schedule">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
                </p>
                </li>`;
            $('#schedule_list').append(result);
        });
    });
    
    socket.on('user-created', function(data) {
        document.cookie = "username=" + data.username;
        window.location.href = "./home.html";
    });

    socket.on('login-error', function(data) {
        alert("Login Error!");
    });

});

$(window).resize(function() {

});