#!/usr/bin/env ruby

$path = File.dirname(File.expand_path(__FILE__))
require File.join($path, "..", "config", "environment")
$pid_dir = File.join($path, '..', 'tmp', 'pids')

Daemons.run_proc('deeds_indexer.rb',  :dir_mode => :normal, :dir => $pid_dir, :log_output => true, :monitor => true) do

  class ActiveSupport::BufferedLogger
    def reinitialize(log = path)
      @buffer        = {}
      @auto_flushing = 1
      @guard = Mutex.new

      if log.respond_to?(:write)
        @log = log
      elsif File.exist?(log)
        @log = open(log, (File::WRONLY | File::APPEND))
        @log.sync = true
      else
        FileUtils.mkdir_p(File.dirname(log))
        @log = open(log, (File::WRONLY | File::APPEND | File::CREAT))
        @log.sync = true
        @log.write("# Logfile created on %s" % [Time.now.to_s])
      end
    end

    def path
      @log.path
    end
  end
  Rails.logger.reinitialize
  ActiveRecord::Base.establish_connection

  loop do
    if ActsAsXapian::ActsAsXapianJob.count > 0
      ActsAsXapian.update_index(true, false)
    end
    sleep 30
  end
end

