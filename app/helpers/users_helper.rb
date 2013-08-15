module UsersHelper

  # Returns the Gravatar (http://gravatar.com/) for the given user
  def gravatar_for(user)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: user.email, class: "gravatar")
  end

  # Check whether the current user is the instance user
  def current_user?(user)
    current_user == user
  end
end
