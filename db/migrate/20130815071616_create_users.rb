class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :nom
      t.string :prenom

      t.timestamps
    end
  end

  def down
  	drop_table :users
  end
end
