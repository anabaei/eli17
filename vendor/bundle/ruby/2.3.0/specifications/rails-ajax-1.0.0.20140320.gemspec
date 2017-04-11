# -*- encoding: utf-8 -*-
# stub: rails-ajax 1.0.0.20140320 ruby lib

Gem::Specification.new do |s|
  s.name = "rails-ajax".freeze
  s.version = "1.0.0.20140320"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Muriel Salvan".freeze]
  s.date = "2014-03-20"
  s.description = "Add Ajax capabilities to Rails websites, with minimal code changes. Supports history, bookmarking, partial refreshes, Rails flashes, user callbacks, scripts execution, redirections. Built upon Rails-UJS and jQuery.".freeze
  s.email = "muriel@x-aeon.com".freeze
  s.homepage = "http://rails-ajax.sourceforge.net".freeze
  s.rubyforge_project = "rails-ajax".freeze
  s.rubygems_version = "2.6.4".freeze
  s.summary = "Add Ajax capabilities to Rails websites with history, bookmarking, partial refreshes, Rails flashes, user callbacks, scripts execution, redirections.".freeze

  s.installed_by_version = "2.6.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>.freeze, [">= 3.2.1"])
    else
      s.add_dependency(%q<rails>.freeze, [">= 3.2.1"])
    end
  else
    s.add_dependency(%q<rails>.freeze, [">= 3.2.1"])
  end
end
