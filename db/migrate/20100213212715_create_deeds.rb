class CreateDeeds < ActiveRecord::Migration
  def self.up
    create_table :deeds do |t|
      t.datetime :performed_at 
      t.text :text
      t.string :speaker
      t.timestamps
    end
    add_index :deeds, :performed_at
    add_index :deeds, :speaker
  end

  def self.down
    drop_table :deeds
  end
end
