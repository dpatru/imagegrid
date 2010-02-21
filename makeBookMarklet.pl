#!/usr/bin/env perl
# Add the following 2 lines to your mercurial setup file (.hg/hgrc) 
# after removeing the  '# ' prefix first):
# [hooks]
# precommit = ./makeBookMarklet.pl < imageGridBookmarklet.js > imagegridbookmarklet.min.js

#
#
# http://daringfireball.net/2007/03/javascript_bookmarklet_builder



use strict;
use warnings;
use URI::Escape qw(uri_escape_utf8);
use open  IO  => ":utf8",       # UTF8 by default
          ":std";               # Apply to STDIN/STDOUT/STDERR

my $src = do { local $/; <> };

# Zap the first line if there's already a bookmarklet comment:
$src =~ s{^// ?javascript:.+\n}{};
my $bookmarklet = $src;

for ($bookmarklet) {
    s{^\s*//.+\n}{}gm;  # Kill comments.
    s{\t}{ }gm;         # Tabs to spaces
    s{[ ]{2,}}{ }gm;    # Space runs to one space
    s{^\s+}{}gm;        # Kill line-leading whitespace
    s{\s+$}{}gm;        # Kill line-ending whitespace
    s{\n}{}gm;          # Kill newlines
}

# Escape single- and double-quotes, spaces, control chars, unicode:
$bookmarklet = "javascript:" .
    uri_escape_utf8($bookmarklet, qq('" \x00-\x1f\x7f-\xff));

# print "// $bookmarklet\n" . $src; # comment out
print "$bookmarklet"; # modify to only print out the bookmark.

# Put bookmarklet on clipboard:
# `/bin/echo -n '$bookmarklet' | /usr/bin/pbcopy`; # this doesn't work for me
