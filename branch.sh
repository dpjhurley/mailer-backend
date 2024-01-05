#!/bin/bash

export FILTER_BRANCH_SQUELCH_WARNING=1 # This will suppress the warning shown by git

git filter-branch -f --env-filter '
    if test "$GIT_AUTHOR_EMAIL" != "dpjhurley@gmail.com"
    then
        GIT_AUTHOR_NAME="Daniel Hurley"
        GIT_AUTHOR_EMAIL=dpjhurley@gmail.com
    fi
    if test "$GIT_COMMITTER_EMAIL" != "dpjhurley@gmail.com"
    then
        GIT_COMMITTER_NAME="Daniel Hurley"
        GIT_COMMITTER_EMAIL=dpjhurley@gmail.com
    fi
' HEAD