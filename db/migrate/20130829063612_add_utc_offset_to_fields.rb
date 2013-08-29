class AddUtcOffsetToFields < ActiveRecord::Migration
  def up
    add_column :fields, :utc_offset, :string, default: "+00:00"
  end

  def down
  	remove_column :fields, :utc_offset
  end
end
