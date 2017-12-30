# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Provide commands for managing databases of Cloud SQL instances."""

from googlecloudsdk.calliope import base
from googlecloudsdk.calliope import exceptions


@base.ReleaseTracks(base.ReleaseTrack.GA, base.ReleaseTrack.BETA)
class Databases(base.Group):
  """Provide commands for managing databases of Cloud SQL instances.

  Provide commands for managing databases of Cloud SQL instances,
  including creating, deleting, listing, patching, updating, and getting
  information about databases.
  """