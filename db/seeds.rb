# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users= User.create([
  {name: "Julienne R. Hanks", email: "JulienneRHanks@dayrep.com"}])

dogs = Dog.create([
  { owner_id: "1",
    name: 'Spot',
    age: '2',
    description: "Boy run fast Tigger scratcher tongue Snowball paws tail aquatic. Polydactyl treats Rover litter cat park bark house train vaccination small animals. Tongue polydactyl critters vitamins feeder field aquatic walk whiskers chow. Play Dead stripes hamster fluffy pet food behavior chirp toys.Grooming stick whiskers bird chow bird toys kibble house train tail stay walk water dog smooshy house train chirp pet gate.",
    dog_photo: File.open("")
  },
  
  { owner_id: "1",
    name: 'Dubs',
    age: '2',
    description: "Boy run fast Tigger scratcher tongue Snowball paws tail aquatic. Polydactyl treats Rover litter cat park bark house train vaccination small animals. Tongue polydactyl critters vitamins feeder field aquatic walk whiskers chow. Play Dead stripes hamster fluffy pet food behavior chirp toys.Grooming stick whiskers bird chow bird toys kibble house train tail stay walk water dog smooshy house train chirp pet gate.",
  },
  
  { owner_id: "1",
    name: 'Lassie',
    age: '2',
    description: "Boy run fast Tigger scratcher tongue Snowball paws tail aquatic. Polydactyl treats Rover litter cat park bark house train vaccination small animals. Tongue polydactyl critters vitamins feeder field aquatic walk whiskers chow. Play Dead stripes hamster fluffy pet food behavior chirp toys.Grooming stick whiskers bird chow bird toys kibble house train tail stay walk water dog smooshy house train chirp pet gate.",
  },
  
  { owner_id: "1",
    name: 'Rover',
    age: '2',
    description: "Boy run fast Tigger scratcher tongue Snowball paws tail aquatic. Polydactyl treats Rover litter cat park bark house train vaccination small animals. Tongue polydactyl critters vitamins feeder field aquatic walk whiskers chow. Play Dead stripes hamster fluffy pet food behavior chirp toys.Grooming stick whiskers bird chow bird toys kibble house train tail stay walk water dog smooshy house train chirp pet gate.",
  },
  
  { owner_id: "1",
    name: 'Spot',
    age: '2',
    description: "Boy run fast Tigger scratcher tongue Snowball paws tail aquatic. Polydactyl treats Rover litter cat park bark house train vaccination small animals. Tongue polydactyl critters vitamins feeder field aquatic walk whiskers chow. Play Dead stripes hamster fluffy pet food behavior chirp toys.Grooming stick whiskers bird chow bird toys kibble house train tail stay walk water dog smooshy house train chirp pet gate.",
  },
  
  
  
  ])