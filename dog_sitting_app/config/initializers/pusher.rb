Pusher.app_id = ENV["pusher_app_id"]
Pusher.key = ENV["pusher_key"]
Pusher.secret = ENV["pusher_secret"]

Pusher.app_id = Figaro.env.pusher_app_id!
Pusher.key    = Figaro.env.pusher_key!
Pusher.secret = Figaro.env.pusher_secret!
