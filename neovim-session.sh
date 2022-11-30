#!/bin/bash
# using `&` and `fg` doesn't work so we use abduco (installed from source)
cd ~/workspace/spoonorshovel
export NVIM_LISTEN_ADDRESS=/tmp/spoonorshovel-nvimsocket
abduco -n spoonorshovel-vim nvim
sleep 1
nvr --nostart --remote-send ':split<Cr>:term<Cr>:file zsh frontend<Cr>icd ~/workspace/spoonorshovel<Cr>pnpm run dev<Cr>'
nvr --nostart --remote-send '<C-a>j:term<Cr>i'
abduco -a spoonorshovel-vim
