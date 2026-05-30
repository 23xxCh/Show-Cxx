# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Repository

- **Owner:** 23xxCh
- **Repo:** Show-Cxx
- **Full name:** 23xxCh/Show-Cxx

## Conventions

- **Create an issue**: `gh issue create --repo 23xxCh/Show-Cxx --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --repo 23xxCh/Show-Cxx --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --repo 23xxCh/Show-Cxx --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo 23xxCh/Show-Cxx --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --repo 23xxCh/Show-Cxx --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo 23xxCh/Show-Cxx --comment "..."`

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo 23xxCh/Show-Cxx --comments`.
