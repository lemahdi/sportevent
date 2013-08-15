module UsersHelper

  # Check whether the current user is the instance user
  def current_user?(user)
    current_user == user
  end
end
