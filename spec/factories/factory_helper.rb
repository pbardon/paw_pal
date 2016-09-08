def sample_file(filename)
    File.new("spec/fixtures/images/#{filename}")
end

def get_random_rating
    (5 * rand).round(1)
end