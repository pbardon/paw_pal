json.partial!("shelters/shelter", shelter: @shelter)

json.current_user_id(@current_user.id)

json.bookings do
  json.array!(@shelter.bookings) do |booking|
    json.(booking, :id, :shelter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end

json.comments do
  json.array!(@shelter.comments) do |comment|
    json.(comment, :rating, :content, :comment_date)
  end
end
