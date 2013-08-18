class AddGmapsToField < ActiveRecord::Migration
  def up
  	add_column :fields, :gmaps, :boolean
  end

  def down
  	remove_column :fields, :gmaps, :boolean
  end
end
