
let reminder_insert_index;

//handles notifing.
let remindersManager = {
	ongoing_reminders : [],
	//{id, reminder_id end_time}
	//edit this ->.
	//reminder_id is the id of the reminder this timer to call its notify()
	notify_timer : 'not set',
	add : function(reminder){
		if(this.notify_timer !== 'not set'){
			//there is a running notify_timer.
			if(this.notify_timer.id === reminder.id){
				// notify timer was set to this reminder
				//cansel it because the reminder.notify_time was changed.
				this.cansel_timer()
			}
			else if(reminder.notify_time < this.notify_timer.end_time){
				//cansel the timer
				this.cansel_timer();
			}
		}
		if((this.ongoing_reminders.includes(reminder))){
			//
			this.resort(reminder);
		}
		else{
			this.ongoing_reminders = insert_sorted_by(this.ongoing_reminders, reminder, 'notify_time');
		}
		this.set_notify_timer();
	},
	resort : function(reminder){
		//complexity O(2n)
		//resort a reminder in ongoing_reminders.
		this.remove(reminder);
		this.add(reminder);
		reminder_insert_index = null;
	},
	remove: function (reminder) {
		if(this.notify_timer !== 'not set'){
			//there is a running notify_timer.
			if(this.notify_timer.id === reminder.id){
				// notify timer was set to this reminder
				//cansel it because the reminder.notify_time was changed.
				this.cansel_timer()
			}
		}
		delete this.ongoing_reminders[this.ongoing_reminders.indexOf(reminder)];
		this.ongoing_reminders = clean_array(this.ongoing_reminders);

	},
	cansel_timer : function(){
		//cansel notify timer timeout
		clearTimeout(this.notify_timer.timeoutid);
		this.notify_timer = 'not set';
	},
	set_notify_timer : function(){
		//edit this ->
		//as a result the case 
		if(this.ongoing_reminders.length && this.notify_timer === 'not set'){
			oldest_reminder = this.ongoing_reminders[0];
			if(oldest_reminder.notify_time < Date.now()){
				//call notify() for the reminder instantly.
				oldest_reminder.notify();
				this.set_notify_timer();
			}
			else{
				//set a notifing timer for the reminder.
				RM = this;
				elapsed_time = oldest_reminder.notify_time - Date.now();
				// setting the timeout in the main Thread.
				/** TODO: use web worker instead to start a setTimeout 
				* in a background process. 
				*/
				this.notify_timer.timeoutid = window.setTimeout(function(){
					oldest_reminder.notify();
					RM.set_notify_timer();
				}, elapsed_time); 
				this.notify_timer.elapsed_time = elapsed_time;
			}
		}
	}
}
