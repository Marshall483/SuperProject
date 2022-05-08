﻿using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IIssueMoqer
{
    public IEnumerable<Issue> ForSprints(IEnumerable<Sprint> sprints, int countPerSprint, string projectName);
}