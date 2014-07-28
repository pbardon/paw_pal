json.partial!("dogs/dog", dog: @dog)

json.bookings do
  json.array!(@dog.bookings) do |booking|
    # Later specify attributes yourself...
    json.(booking, :sitter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end
