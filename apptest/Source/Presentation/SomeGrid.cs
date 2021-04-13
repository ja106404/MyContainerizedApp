using Mitchell.CSG.CommonCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mitchell.CSG.apptest.Presentation
{
    // This view model endpoint is "/api/view/somegrid".
    public class SomeGrid : IViewModelGet<IEnumerable<SomeGrid.GridDataDTO>>
    {
        public class GridDataDTO
        {
            public string ClaimNumber { get; set; }
            public string ClaimantId { get; set; }
            public string ClaimantName { get; set; }
            public DateTime DateOfLoss { get; set; }
        }

        public async Task<IEnumerable<GridDataDTO>> GetAsync()
        {
            var gridData = new List<GridDataDTO>
            {
                new GridDataDTO { ClaimNumber = "123504", ClaimantId = "3876", ClaimantName = "Doe, John", DateOfLoss = DateTime.Now },
                new GridDataDTO { ClaimNumber = "123504", ClaimantId = "3877", ClaimantName = "Doe, Jane", DateOfLoss = DateTime.Now },
                new GridDataDTO { ClaimNumber = "678901", ClaimantId = "3911", ClaimantName = "Smith, Bob", DateOfLoss = DateTime.Now }
            };

            return await Task.FromResult(gridData);
        }
    }
}