json.partial!("dogs/dog", dog: @dog)

json.comments do
  json.array!(@dog.comments) do |comment|
    json.(comment, :rating, :content, :comment_date)
  end
end
