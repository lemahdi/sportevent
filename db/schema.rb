# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140504145719) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.text     "body"
    t.integer  "match_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["match_id"], name: "index_comments_on_match_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "contracts", force: true do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "contracts", ["group_id"], name: "index_contracts_on_group_id"
  add_index "contracts", ["user_id", "group_id"], name: "index_contracts_on_user_id_and_group_id", unique: true
  add_index "contracts", ["user_id"], name: "index_contracts_on_user_id"

  create_table "fields", force: true do |t|
    t.string   "street"
    t.string   "city"
    t.string   "country"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "gmaps"
    t.string   "name",       default: ""
    t.string   "timezone",   default: "UTC"
  end

  create_table "groups", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "groups", ["name"], name: "index_groups_on_name", unique: true

  create_table "matches", force: true do |t|
    t.string   "start"
    t.integer  "duration"
    t.integer  "field_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "jour"
  end

  add_index "matches", ["field_id"], name: "index_matches_on_field_id"

  create_table "registres", force: true do |t|
    t.integer  "user_id"
    t.integer  "match_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "registres", ["match_id"], name: "index_registres_on_match_id"
  add_index "registres", ["user_id", "match_id"], name: "index_registres_on_user_id_and_match_id", unique: true
  add_index "registres", ["user_id"], name: "index_registres_on_user_id"

  create_table "users", force: true do |t|
    t.string   "nom"
    t.string   "prenom"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.string   "authentication_token"
    t.boolean  "admin",                  default: false
  end

  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", unique: true
  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true

end
