#!/usr/bin/env python
# -*- coding:utf-8 -*-

"""
copy assets

usage: script/copy_assets.py

"""

import os
import shutil


# ファイル配信ディレクトリへのパス
STATIC_ROOT = '/srv/static/'

# 通常配信したいファイルパス
ASSETS_DIRS = ['res']
# zip圧縮で配信したいファイルパス
ZIP_ASSETS_DIRS = ['src']


def clear_static_root():
    """
    ファイル配信ディレクトリを空に
    """
    if os.path.exists(STATIC_ROOT):
        shutil.rmtree(STATIC_ROOT)
    os.mkdir(STATIC_ROOT)

def copy_assets():
    """
    通常ファイルをファイル配信ディレクトリにコピー
    """
    for assets_dir in ASSETS_DIRS:
        dst_dir = os.path.join(STATIC_ROOT + assets_dir)
        shutil.copytree(assets_dir, dst_dir)

def copy_zip_assets():
    """
    圧縮ファイルをファイル配信ディレクトリにコピー
    """
    for z_dir in ZIP_ASSETS_DIRS:
        z_path = z_dir + '.zip'
        dst_path = os.path.join(STATIC_ROOT + z_path)
        shutil.copy(z_path, dst_path)


def main():
    clear_static_root()
    copy_assets()
    copy_zip_assets()


if __name__ == '__main__':
    main()


