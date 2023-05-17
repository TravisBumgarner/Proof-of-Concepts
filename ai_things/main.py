import os
import sys
import shutil
import requests
from dotenv import load_dotenv
from assembly_ai import assembly_ai

load_dotenv()

SUPPORTED_VIDEO_TYPES = [
  'webm',
  'mp4'
]



def main():
  n = len(sys.argv)
  if n != 2:
    print("Provide a filename in input dir for video file.")
    return

  video_filename = sys.argv[1]
  video_extension = video_filename.split('.')[-1]
  audio_filename = f"{video_filename.split('.')[0]}.mp3"
  video_path = os.path.join('./input', video_filename)
  audio_path = os.path.join('./output',audio_filename)
  

  if not os.path.exists(video_path):
    print("No file by that name exists")
    return

  if not video_extension in SUPPORTED_VIDEO_TYPES:
    print("invalid file type")
    return
  
  if os.path.isfile(audio_path):
    print("audio already exists, skipping ffmpeg step")
  else:
    print('extracting audio from fideo file')
    os.system(f"ffmpeg -i {video_path} -vn -ar 44100 -ac 2 -ab 192k -f mp3 {audio_path}")

  assembly_ai_transcript = assembly_ai(audio_path)

main()