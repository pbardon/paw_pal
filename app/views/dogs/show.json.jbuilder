json.partial!("dogs/dog", dog: @dog)

json.bookings do
  json.array!(@dog.bookings) do |booking|
    json.(booking, :sitter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end

json.comments do
  json.array!(@dog.comments) do |comment|
    json.(booking, :rating, :content, :date, :comment_date)
  end
end
