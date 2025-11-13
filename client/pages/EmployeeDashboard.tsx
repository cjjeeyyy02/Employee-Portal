import Layout from "@/components/Layout";

export default function EmployeeDashboard() {
  return (
    <Layout>
      {/* Top Section - 2 Column Flex Layout */}
      <div style={{ gap: "20px", display: "flex" }}>
        {/* Left Column - 50% */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: "normal", width: "50%", marginLeft: "0px" }}>
          {/* Tall Skeleton Card */}
          <div
            style={{
              animationDuration: "2s",
              animationIterationCount: "infinite",
              animationName: "pulse",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
              backgroundColor: "rgb(209, 213, 219)",
              borderRadius: "8px",
              fontWeight: "400",
              height: "384px",
            }}
          />
        </div>

        {/* Right Column - 50% */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: "normal", width: "50%", marginLeft: "20px" }}>
          {/* 5-Card Grid (4 small + 1 tall) */}
          <div
            style={{
              display: "grid",
              fontWeight: "400",
              gap: "16px",
              gridTemplate: "none / repeat(5, minmax(0px, 1fr))",
              marginBottom: "24px",
            }}
          >
            {/* Small Card 1 */}
            <div
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationName: "pulse",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                backgroundColor: "rgb(209, 213, 219)",
                borderRadius: "8px",
                fontWeight: "400",
                gridArea: "auto / span 1 / auto / span 1",
                height: "96px",
              }}
            />

            {/* Small Card 2 */}
            <div
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationName: "pulse",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                backgroundColor: "rgb(209, 213, 219)",
                borderRadius: "8px",
                fontWeight: "400",
                gridArea: "auto / span 1 / auto / span 1",
                height: "96px",
              }}
            />

            {/* Small Card 3 */}
            <div
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationName: "pulse",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                backgroundColor: "rgb(209, 213, 219)",
                borderRadius: "8px",
                fontWeight: "400",
                gridArea: "auto / span 1 / auto / span 1",
                height: "96px",
              }}
            />

            {/* Small Card 4 */}
            <div
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationName: "pulse",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                backgroundColor: "rgb(209, 213, 219)",
                borderRadius: "8px",
                fontWeight: "400",
                gridArea: "auto / span 1 / auto / span 1",
                height: "96px",
              }}
            />

            {/* Tall Card */}
            <div
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
                animationName: "pulse",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
                backgroundColor: "rgb(209, 213, 219)",
                borderRadius: "8px",
                fontWeight: "400",
                gridArea: "auto / span 1 / auto / span 1",
                height: "384px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Middle Section - 3 Column Grid */}
      <div
        style={{
          display: "grid",
          fontWeight: "400",
          gap: "24px",
          gridTemplate: "none / repeat(3, minmax(0px, 1fr))",
          marginBottom: "24px",
        }}
      >
        {/* Left Side - Spans 2 Columns */}
        <div
          style={{
            fontWeight: "400",
            gridArea: "auto / span 2 / auto / span 2",
          }}
        />

        {/* Right Side - Spans 1 Column */}
        <div
          style={{
            fontWeight: "400",
            gridArea: "auto / span 1 / auto / span 1",
          }}
        />
      </div>

      {/* Bottom Section - 3 Column Grid */}
      <div
        style={{
          display: "grid",
          fontWeight: "400",
          gap: "24px",
          gridTemplate: "none / repeat(3, minmax(0px, 1fr))",
        }}
      >
        {/* Left Side - Spans 2 Columns */}
        <div
          style={{
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationName: "pulse",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
            backgroundColor: "rgb(209, 213, 219)",
            borderRadius: "8px",
            fontWeight: "400",
            gridArea: "auto / span 2 / auto / span 2",
            height: "192px",
          }}
        />

        {/* Right Side - Spans 1 Column */}
        <div
          style={{
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationName: "pulse",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
            backgroundColor: "rgb(209, 213, 219)",
            borderRadius: "8px",
            fontWeight: "400",
            gridArea: "auto / span 1 / auto / span 1",
            height: "192px",
          }}
        />
      </div>
    </Layout>
  );
}
