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
function myEvents(username){
    $.get(`/events/user/${username}`, function(data) {
        $('#events_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.date){
                    result += `<p><strong>On: </strong>${new Date(single.date)}</p>`;
                }
                if(single.host){
                    result += `<p class="${single.host}"><strong>Hosted By: </strong><span class="host">${single.host}</span></p>`;
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
                    result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
                }
                result += `
                <p class="delete_event">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
                </p>
                <p class="remove_event">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Events">
                </p>
                </li>`;
                return result;
            })
        );
        let hosts = document.getElementsByClassName('host');
        Array.from(hosts).forEach((host) => {
            let _id = host.innerHTML; 
            $.get(`/users/id/${_id}`, function(data){
            $(`.${_id}`).each(function(){
                $(this).find('span').html(data.username);
            })
            });
                
        });

    });
}
function myTasks(username){
    $.get(`/tasks/user/${username}`, function(data) {
        $('#task_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.deadline){
                    result += `<p><strong>Deadline: </strong>${new Date(single.deadline)}</p>`;
                }
                if(single.location){
                    result += `<p><strong>Location: </strong>${single.location}</p>`;
                }
                if(single.description){
                    result += `<p><strong>Description: </strong>${single.description}</p>`;
                }
                if(single.reminder){
                    result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
                }
                result += `
                <p class="delete_task">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Task">
                </p>
                <p class="remove_task">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Tasks">
                </p>
                </li>`;
                return result;
            })
        );
        

    });
}
function mySchedules(username){
    $.get(`/schedules/user/${username}`, function(data) {
        $('#schedule_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.description){
                    result += `<p><strong>Description: </strong>${single.description}</p>`;
                }
                result += `
                <p class="delete_shedule">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Schedule">
                </p>
                <p class="remove_schedule">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Schedules">
                </p>
                </li>`;
                return result;
            })
        );
        

    });
}
function availableEvents(username){
    $.get(`/events/all/user/${username}`, function(data) {
        $('#all_events_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.date){
                    result += `<p><strong>On: </strong>${new Date(single.date)}</p>`;
                }
                if(single.host){
                    result += `<p class="${single.host}"><strong>Hosted By: </strong><span class="host">${single.host}</span></p>`;
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
                    result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
                }
                result += `
                <p class="add_event">
                    <input type="submit" name="add" class="button btn btn-warning" value="Add To My Events">
                </p>
                </li>`;
                return result;
            })
            
        );
        let hosts = document.getElementsByClassName('host');
        Array.from(hosts).forEach((host) => {
            let _id = host.innerHTML; 
            $.get(`/users/id/${_id}`, function(data){
            $(`.${_id}`).each(function(){
                $(this).find('span').html(data.username);
            })
            });
                
        }); 
            

    });
}
function availableTasks(username){
    $.get(`/tasks/all/user/${username}`, function(data) {
        $('#all_tasks_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.deadline){
                    result += `<p><strong>Deadline: </strong>${new Date(single.deadline)}</p>`;
                }
                if(single.location){
                    result += `<p><strong>Location: </strong>${single.location}</p>`;
                }
                if(single.description){
                    result += `<p><strong>Description: </strong>${single.description}</p>`;
                }
                if(single.reminder){
                    result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
                }
                result += `
                <p class="add_task">
                    <input type="submit" name="add" class="button btn btn-warning" value="Add To My Events">
                </p>
                </li>`;
                return result;
            })
        );
            

    });
}
function availableSchedules(username){
    $.get(`/schedules/all/${username}`, function(data) {
        $('#all_schedules_list').html(
            data.map(function(single){
                let result = `<li class="list-group-item">
                <h3>${single.name}</h3>
                <span style="display: none;">${single._id}</span>`
                if(single.description){
                    result += `<p><strong>Description: </strong>${single.description}</p>`;
                }
                result += `
                <p class="add_schedule">
                    <input type="submit" name="add" class="button btn btn-warning" value="Add To My Schedules">
                </p>
                </li>`;
                return result;
            })
        );
        

    });
}

$(document).ready(function() {

    // handle login/signup page
    
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
    
    socket.on('user-created', function(data) {
        document.cookie = "username=" + data.username;
        window.location.href = "./home.html";
    });

    socket.on('error', function(data) {
        alert(data);
    });


    const username = getCookie('username');

    //load data into each panel
    if(username){
        myEvents(username);
        myTasks(username);
        mySchedules(username);
        availableEvents(username);
        availableTasks(username);
        availableSchedules(username);
    }

        
    
    //open and close creation forms
    $('#event_toggle').click(()=>{
        $('#event_form').show();
        $('#event_toggle').hide();
    });
    
    $('#task_toggle').click(()=>{
        $('#task_form').show();
        $('#task_toggle').hide();
    });

    $('#schedule_toggle').click(()=>{
        $('#schedule_form').show();
        $('#schedule_toggle').hide();
    });

    //submit creation form
    $('#event_form').submit((event)=>{
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
            $('#event_form').hide();
            $('#event_toggle').show();
            let result = `<li class="list-group-item"><h3>${name}</h3>`;
            if(date){
                result += `<p><strong>On: </strong>${new Date(date)}</p>`;
            }
            result += `<p><strong>Hosted By: </strong>${host}</p>`;
            
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
                result += `<p><strong>Reminder on: </strong>${new Date(reminder)}</p>`;
            }
            result += `<p class="delete_event">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
                </p>
                <p class="remove_event">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Events">
                </p>
                </li>`;
            $('#events_list').append(result);
        });
    });
    $('#task_form').submit((task)=>{
        task.preventDefault();
        const name = $('#task_name').val();
        const deadline = $('#task_deadline').val();
        const reminder = $('#task_reminder').val();
        const location = $('#task_location').val();
        const description = $('#task_desc').val();
        const username = getCookie('username');
        $.post("/tasks", {name, deadline, reminder, location, description, username},  function(data) {
            $('#task_name').val('');
            $('#task_deadline').val('');
            $('#task_reminder').val('');
            $('#task_location').val('');
            $('#task_desc').val('');
            $('#task_form').hide();
            $('#task_toggle').show();
            let result = `<li class="list-group-item"><h3>${name}</h3>`;
            if(deadline){
                result += `<p><strong>Deadline: </strong>${new Date(deadline)}</p>`;
            }
            if(location){
                result += `<p><strong>Location: </strong>${location}</p>`;
            }
            if(description){
                result += `<p><strong>Description: </strong>${description}</p>`;
            }
            if(reminder){
                result += `<p><strong>Reminder on: </strong>${new Date(reminder)}</p>`;
            }
            result += `<p class="delete_task">
                    <input type="submit" name="delete" class="button btn btn-danger" value="Delete Task">
                </p>
                <p class="remove_task">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Tasks">
                </p>
                </li>`;
            $('#task_list').append(result);
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
                <p class="remove_schedule">
                    <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Schedules">
                </p>
                </li>`;
            $('#schedule_list').append(result);
        });
    });
    
    //cancel creation
    $('#cancel_event').click(()=>{
        $('#event_name').val('');
        $('#event_date').val('');
        $('#event_reminder').val('');
        $('#event_venue').val('');
        $('#event_price').val('');
        $('#event_desc').val('');
        $('#event_form').hide();
        $('#event_toggle').show();

    });
    $('#cancel_task').click(()=>{
        $('#task_name').val('');
        $('#task_deadline').val('');
        $('#task_reminder').val('');
        $('#task_location').val('');
        $('#task_desc').val('');
        $('#task_form').hide();
        $('#task_toggle').show();

    });
    $('#cancel_schedule').click(()=>{
        $('#schedule_name').val('');
        $('#schedule_desc').val('');
        $('#schedule_form').hide();
        $('#schedule_toggle').show();

    });

    //delete item completely
    $(document).on('click','.delete_event', function(){
        let name = $(this).parent().find('h3').get( 0 ).innerHTML;
        $(this).parent().css("display", "none");
        $.post("/events/delete", {name},  function(data) {
            
        });
    });
    $(document).on('click','.delete_task', function(){
        let name = $(this).parent().find('h3').get( 0 ).innerHTML;
        $(this).parent().css("display", "none");
        $.post("/tasks/delete", {name},  function(data) {
            
        });
    });
    $(document).on('click','.delete_schedule', function(){
        let name = $(this).parent().find('h3').get( 0 ).innerHTML;
        $(this).parent().css("display", "none");
        $.post("/schedule/delete", {name},  function(data) {
            
        });
    });

    //add available item to personal list
    $(document).on('click','.add_event', function(){
        let username = getCookie('username');
        let eventname = $(this).parent().find('h3').get( 0 ).innerHTML;
        let host = $(this).parent().find('.host').get( 0 ).innerHTML;
        document.cookie = "host=" + host;
        $.get(`/events/${eventname}`, function(single) {
            let host = getCookie('host');
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.date){
                result += `<p><strong>On: </strong>${new Date(single.date)}</p>`;
            }
            if(single.host){
                result += `<p class="${single.host}"><strong>Hosted By: </strong><span class="host">${host}</span></p>`;
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
                result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
            }
            result += `
            <p class="delete_event">
                <input type="submit" name="delete" class="button btn btn-danger" value="Delete Event">
            </p>
            <p class="remove_event">
                <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Events">
            </p>
            </li>`;
            $('#events_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/events/add", {eventname, username},  function(data) {
            
        });
    });

    $(document).on('click','.add_task', function(){
        let username = getCookie('username');
        let taskname = $(this).parent().find('h3').get( 0 ).innerHTML;
        $.get(`/tasks/${taskname}`, function(single) {
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.deadline){
                result += `<p><strong>Deadline: </strong>${new Date(single.deadline)}</p>`;
            }
            if(single.location){
                result += `<p><strong>Location: </strong>${single.location}</p>`;
            }
            if(single.description){
                result += `<p><strong>Description: </strong>${single.description}</p>`;
            }
            if(single.reminder){
                result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
            }
            result += `
            <p class="delete_task">
                <input type="submit" name="delete" class="button btn btn-danger" value="Delete Task">
            </p>
            <p class="remove_task">
                <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Tasks">
            </p>
            </li>`;
            $('#task_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/tasks/add", {taskname, username},  function(data) {
            
        });
    });

    $(document).on('click','.add_schedule', function(){
        let username = getCookie('username');
        let schedulename = $(this).parent().find('h3').get( 0 ).innerHTML;
        $.get(`/schedules/${schedulename}`, function(single) {
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.description){
                result += `<p><strong>Description: </strong>${single.description}</p>`;
            }
            result += `
            <p class="delete_shedule">
                <input type="submit" name="delete" class="button btn btn-danger" value="Delete Schedule">
            </p>
            <p class="remove_schedule">
                <input type="submit" name="remove" class="button btn btn-warning" value="Remove From My Schedules">
            </p>
            </li>`;
            $('#schedule_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/schedules/add", {schedulename, username},  function(data) {
            
        });
    });

    //remove item from personal list
    $(document).on('click','.remove_event', function(){
        let username = getCookie('username');
        let eventId = $(this).parent().find('span').get( 0 ).innerHTML;
        let eventname = $(this).parent().find('h3').get( 0 ).innerHTML;
        let host = $(this).parent().find('.host').get( 0 ).innerHTML;
        document.cookie = "host=" + host;
        $.get(`/events/${eventname}`, function(single) {
            let host = getCookie('host');
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.date){
                result += `<p><strong>On: </strong>${new Date(single.date)}</p>`;
            }
            if(single.host){
                result += `<p class="${single.host}"><strong>Hosted By: </strong><span class="host">${host}</span></p>`;
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
                result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
            }
            result += `
            <p class="add_event">
                <input type="submit" name="add" class="button btn btn-warning" value="Add To My Events">
            </p>
            </li>`;
            $('#all_events_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/events/remove", {eventId, username},  function(data) {
            
        });
    });
    $(document).on('click','.remove_task', function(){
        let username = getCookie('username');
        let taskId = $(this).parent().find('span').get( 0 ).innerHTML;
        let taskname = $(this).parent().find('h3').get( 0 ).innerHTML;
        $.get(`/tasks/${taskname}`, function(single) {
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.deadline){
                result += `<p><strong>Deadline: </strong>${new Date(single.deadline)}</p>`;
            }
            if(single.location){
                result += `<p><strong>Location: </strong>${single.location}</p>`;
            }
            if(single.description){
                result += `<p><strong>Description: </strong>${single.description}</p>`;
            }
            if(single.reminder){
                result += `<p><strong>Reminder on: </strong>${new Date(single.reminder)}</p>`;
            }
            result += `
            <p class="add_task">
                <input type="submit" name="add" class="button btn btn-warning" value="Add To My Tasks">
            </p>
            </li>`;
            $('#all_tasks_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/tasks/remove", {taskId, username},  function(data) {
            
        });
    });
    $(document).on('click','.remove_schedule', function(){
        let username = getCookie('username');
        let scheduleId = $(this).parent().find('span').get( 0 ).innerHTML;
        let schedulename = $(this).parent().find('h3').get( 0 ).innerHTML;
        $.get(`/schedules/${schedulename}`, function(single) {
            let result = `<li class="list-group-item">
            <h3>${single.name}</h3>
            <span style="display: none;">${single._id}</span>`
            if(single.description){
                result += `<p><strong>Description: </strong>${single.description}</p>`;
            }
            result += `
            <p class="add_schedule">
                <input type="submit" name="add" class="button btn btn-warning" value="Add To My Schedules">
            </p>
            </li>`;
            $('#all_schedules_list').append(result);
        });
        $(this).parent().css("display", "none");
        $.post("/schedules/remove", {scheduleId, username},  function(data) {
            
        });
    });
    
    

});

$(window).resize(function() {

});