require 'ffaker'

namespace :db do
  task :populate => :environment do
    now = Time.new
    print "How many fake deeds do you want? "
    num_deeds = $stdin.gets.to_i
    num_deeds.times do
      deed = Deed.create(
        :performed_at => Date.new(now.year - rand(1), 1 + rand(12), 1 + rand(28)),
        :text => Faker::Lorem.sentence(rand(20)),
        :speaker => Faker::Name.name
      )
    end
    print "#{num_deeds} created.\n"
  end
end
