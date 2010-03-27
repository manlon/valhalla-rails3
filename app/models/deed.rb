class Deed < ActiveRecord::Base
  acts_as_xapian :texts => [ :text ], 
                 :values => [ [ :performed_at, 0, "performed_at", :date ] ], 
                 :terms => [ [ :speaker, 'S', "speaker" ] ]
end
