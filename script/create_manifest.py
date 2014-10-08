#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
create manifest file

usage: script/create_manifest.py (-v <version>)

options:
    -v version
"""

import os
import shutil
import hashlib
import subprocess
import json

from docopt import docopt


# ファイル配信URL
STATIC_URL = 'http://128.199.166.94/static/'

# マニフェストファイルパス
MANIFEST_PATH = 'res/Manifests/project.manifest'
VERSION_PATH = 'res/Manifests/version.manifest'

# cocos2d-jsのバージョン
ENGINE_VERSION = '3.0'

# 通常配信したいファイルパス
ASSETS_DIRS = ['res']
# zip圧縮で配信したいファイルパス
ZIP_ASSETS_DIRS = ['src']


def zip_assets():
    """
    zipファイルを作成
    """
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        subprocess.check_call(['zip', '-r', z_path, z_dir])

def init_manifest(version):
    """
    マニフェストファイルのベース部分
    """
    manifest = {}
    manifest['packageUrl'] = STATIC_URL
    manifest['remoteManifestUrl'] = STATIC_URL + MANIFEST_PATH
    manifest['remoteVersionUrl'] = STATIC_URL + VERSION_PATH
    manifest['version'] = version
    manifest['engineVersion'] = ENGINE_VERSION
    return manifest

def assets_md5():
    """
    通常ファイルのmd5
    """
    assets_dic = {}
    for assets_dir in ASSETS_DIRS:
        for dpath, dnames, fnames in os.walk(assets_dir):
            for fname in fnames:
                path = os.path.join(dpath, fname)
                with open(path, 'r') as f:
                    byte = f.read()
                    assets_dic[path] = {'md5': hashlib.md5(byte).hexdigest()}
    return assets_dic

def zip_assets_md5():
    """
    zipファイルのmd5
    """
    assets_dic = {}
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        with open(z_path, 'r') as f:
            byte = f.read()
            assets_dic[z_path] = {
                'md5': hashlib.md5(byte).hexdigest(),
                'compressed': True
            }
    return assets_dic

def create_manifest(version):
    """
    マニフェストファイルを出力
    """
    manifest = init_manifest(version)
    with open(VERSION_PATH, 'w') as f:
        json.dump(manifest, f, sort_keys=True, indent=2)

    manifest['assets'] = {}
    manifest['assets'].update(assets_md5())
    manifest['assets'].update(zip_assets_md5())
    with open(MANIFEST_PATH, 'w') as f:
        json.dump(manifest, f, sort_keys=True, indent=2)


def main(version):
    zip_assets()
    create_manifest(version)


if __name__ == '__main__':
    args = docopt(__doc__)
    main(args['-v'])

