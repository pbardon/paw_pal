json.partial!("sitters/sitter", sitter: @sitter)

json.current_user_id(@current_user.id)

json.bookings do
  json.array!(@sitter.bookings) do |booking|
    # Later specify attributes yourself...
    json.(booking, :id, :sitter_id, :dog_id, :date_start, :date_end, :message, :confirmed, :completed)
  end
end
