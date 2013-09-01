class RemoveUtcOffsetFromFields < ActiveRecord::Migration

  def up
  	remove_column :fields, :utc_offset
  end

  def down
    add_column :fields, :utc_offset, :string, default: "+00:00"
  end
end
