#! /usr/bin/python2.7
import json, sys
import urllib2
import os
import git


folder = '.'
if len(sys.argv) >= 2:
	folder = sys.argv[1]
if folder[-1] != '/':
	folder += '/'

print('Folder', folder)

content = urllib2.urlopen("https://raw.githubusercontent.com/ralmn/Superpowers-Plugins-list/gh-pages/plugins.json").read()

j = json.loads(content)

for item in j:
	if 'repoLink' in item:
		repoLink = item['repoLink']
		author = repoLink.split('/')[3] 
		repoName = repoLink.split('/')[4] 
		authorDir = folder  + author
		if not os.path.exists(authorDir):
			os.makedirs(authorDir)
		repo_dir = authorDir + "/" + repoName
		print(repo_dir)
		if not os.path.exists(repo_dir):
			print('Cloning ...')
			git.Repo.clone_from(repoLink, repo_dir)
			print('Cloned')
		else:
			g = git.cmd.Git(repo_dir)
			print('Pulling ...')
			g.pull()
			print('Pulled')






