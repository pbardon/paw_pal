json.array!(@shelters) do |shelter|
  json.partial!("shelters/shelter", shelter: shelter)
end
